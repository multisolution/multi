<?php declare(strict_types=1);

namespace Multi;

use Firebase\JWT\JWT;
use GraphQL\Error\Debug;
use GraphQL\Error\FormattedError;
use GraphQL\Error\UserError;
use Monolog\Handler\StreamHandler;
use Multi\User\User;
use Siler\Dotenv as Env;
use Siler\Monolog as Log;
use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{debug, execute, schema};
use function Siler\Swoole\{bearer, http, json, raw};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

Env\init($base_dir);
Log\handler(new StreamHandler("$base_dir/app.log"));

$type_defs = file_get_contents("$base_dir/schema.graphql");
$resolvers = require_once "$base_dir/resolvers.php";
$schema = schema($type_defs, $resolvers);

$context = new Context();
$context->debug = Env\bool_val('APP_DEBUG', false);
$context->db = new InMemoryDb();
$context->appKey = Env\env('APP_KEY');
$context->id = new UniqueId();

include "$base_dir/seed.php";
debug($context->debug ? Debug::INCLUDE_DEBUG_MESSAGE | Debug::RETHROW_INTERNAL_EXCEPTIONS : 0);

$handler = function () use ($schema, $context) {
    try {
        $context->user = maybe(bearer())->bind(function (string $token) use ($context): ?User {
            $token = JWT::decode($token, $context->appKey, ['HS256']);
            return $context->db->userById($token->userId);
        })->return();

        $result = execute($schema, decode(raw()), [], $context);
    } catch (UserError $error) {
        $result = FormattedError::createFromException($error);
    } catch (Throwable $exception) {
        if ($context->debug) {
            $result = [
                'error' => true,
                'message' => $exception->getMessage(),
                'trace' => $exception->getTrace()
            ];
        } else {
            $result = [
                'error' => true,
                'message' => 'Internal',
            ];

            Log\error($exception->getMessage());
        }
    } finally {
        json($result);
    }
};

http($handler, 8000)->start();
