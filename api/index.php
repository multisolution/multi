<?php declare(strict_types=1);

namespace Multi;

use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use GraphQL\Error\Debug;
use GraphQL\Error\FormattedError;
use GraphQL\Error\UserError;
use Multi\Http\IcsHandler;
use Multi\User\User;
use Sentry\ClientBuilder;
use Sentry\Monolog\Handler;
use Sentry\State\Hub;
use Siler\Dotenv as Env;
use Siler\Monolog as Log;
use Siler\Route;
use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{debug, execute, schema};
use function Siler\Swoole\{bearer, cors, http, json, raw};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

$dbs = include "$base_dir/app/dbs.php";

Log\handler(new Handler(new Hub(ClientBuilder::create(['dsn' => Env\env('SENTRY_DSN')])->getClient())));

$type_defs = file_get_contents("$base_dir/schema.graphql");
$resolvers = require_once "$base_dir/resolvers.php";
$schema = schema($type_defs, $resolvers);

$context = new Context();
$context->debug = Env\bool_val('APP_DEBUG', false);
$context->db = $dbs[Env\env('APP_DB_USE', 'in_memory')](Env\env('APP_DB_URI'));
$context->appKey = Env\env('APP_KEY');
$context->id = new UniqueId();
$context->messages = new InMemoryMessages();

$icsHandler = new IcsHandler($context);

debug($context->debug ? Debug::INCLUDE_DEBUG_MESSAGE | Debug::INCLUDE_TRACE : 0);

$handler = function () use ($schema, $context, $icsHandler) {
    if ($result = Route\get('/meetings/{meeting_id}.ics', $icsHandler)) {
        return;
    }

    try {
        $context->user = maybe(bearer())->bind(function (string $token) use ($context): ?User {
            try {
                $token = JWT::decode($token, $context->appKey, ['HS256']);
            } catch (SignatureInvalidException $exception) {
                throw new UserError($context->messages->get('invalid_token'));
            }

            return $context->db->userById($token->userId);
        })->return();

        $result = execute($schema, decode(raw()), [], $context);
    } catch (Throwable $exception) {
        Log\error($exception->getMessage(), ['exception' => $exception]);
        $result = FormattedError::createFromException($exception);
    } finally {
        cors('*', 'authorization, content-type');
        json($result);
    }
};

http($handler, 8000)->start();
