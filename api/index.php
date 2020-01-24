<?php declare(strict_types=1);

namespace Multi;

use Firebase\JWT\JWT;
use GraphQL\Error\{Debug, FormattedError};
use Monolog\Handler\ErrorLogHandler;
use Multi\Event\Dispatcher;
use Multi\Http\IcsHandler;
use Multi\User\User;
use Siler\Monolog as Log;
use Siler\Route;
use Swoole\Runtime;
use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\Env\{env_bool, env_var};
use function Siler\Functional\lazy;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{debug, execute, schema, subscriptions_at, subscriptions_manager};
use function Siler\Swoole\{bearer, cors, http_server_port, json, raw};
use function Siler\Swoole\graphql_subscriptions;
use const Siler\Swoole\cors;

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

Runtime::enableCoroutine();
//Log\handler(new Handler(new Hub(ClientBuilder::create(['dsn' => env_var('SENTRY_DSN')])->getClient()), Logger::WARNING));
Log\handler(new ErrorLogHandler());

$dbs = include "$base_dir/app/dbs.php";
$type_defs = file_get_contents("$base_dir/app/schema.graphql");
$resolvers = require_once "$base_dir/app/resolvers.php";
$schema = schema($type_defs, $resolvers);
$root_value = [];

$dispatcher = new Dispatcher();
//$dispatcher->add(new SendGridListener(new SendGrid(env_var('SENDGRID_API_KEY')), env_var('SENDGRID_API_FROM')));

$context = new Context();
$context->debug = env_bool('APP_DEBUG', false);
$context->db = $dbs[env_var('APP_DB_USE', 'in_memory')](env_var('APP_DB_URI'));
$context->appKey = env_var('APP_KEY');
$context->id = new UniqueId();
$context->messages = new InMemoryMessages();
$context->dispatcher = $dispatcher;

$icsHandler = new IcsHandler($context);

debug($context->debug ? Debug::INCLUDE_DEBUG_MESSAGE | Debug::INCLUDE_TRACE : 0);
subscriptions_at('ws://localhost:8001');

$handler = function () use ($schema, $root_value, $context, $icsHandler) {
    Route\get('/meetings/{meeting_id}.ics', $icsHandler);

    Route\options('/graphql', lazy(cors));
    Route\post('/graphql', function () use ($schema, $root_value, $context): void {
        try {
            $context->user = maybe(bearer())->bind(function (string $token) use ($context): ?User {
                $token = JWT::decode($token, $context->appKey, ['HS256']);
                return $context->db->userById($token->userId);
            })->return();

            $result = raw() ? execute($schema, decode(raw()), $root_value, $context) : null;
        } catch (Throwable $exception) {
            Log\error($exception->getMessage(), ['exception' => $exception, 'trace' => $exception->getTrace()]);
            $result = FormattedError::createFromException($exception);
        } finally {
            cors();
            json($result);
        }
    });
};

$manager = subscriptions_manager($schema, [], $root_value, $context);
$server = graphql_subscriptions($manager, 8001);

http_server_port($server, $handler, 8000);

$server->start();
