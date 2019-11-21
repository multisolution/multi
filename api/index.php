<?php

declare(strict_types=1);

namespace Multi;

use Firebase\JWT\JWT;
use GraphQL\Error\{Debug, FormattedError};
use Monolog\Handler\ErrorLogHandler;
use Monolog\Logger;
use Multi\Http\IcsHandler;
use Multi\User\User;
use Sentry\ClientBuilder;
use Sentry\Monolog\Handler;
use Sentry\State\Hub;
use Siler\Dotenv as Env;
use Siler\Monolog as Log;
use Siler\Route;
use Siler\Container;
use Throwable;

use const Siler\Route\DID_MATCH;
use const Siler\Swoole\SWOOLE_HTTP_REQUEST;
use const Siler\Swoole\SWOOLE_HTTP_REQUEST_ENDED;
use const Siler\Swoole\SWOOLE_HTTP_RESPONSE;

use function Siler\Encoder\Json\decode;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{debug, execute, schema, subscriptions_at, subscriptions_manager};
use function Siler\Swoole\graphql_subscriptions;
use function Siler\Swoole\{bearer, cors, http, json, raw};





$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";


Log\handler(new Handler(new Hub(ClientBuilder::create(['dsn' => Env\env('SENTRY_DSN')])->getClient()), Logger::WARNING));
Log\handler(new ErrorLogHandler());

$type_defs = file_get_contents("$base_dir/schema.graphql");
$resolvers = require_once "$base_dir/resolvers.php";
$schema = schema($type_defs, $resolvers);



$context = require_once "$base_dir/context.php";





$icsHandler = new IcsHandler($context);

debug($context->debug ? Debug::INCLUDE_DEBUG_MESSAGE : 0);


subscriptions_at('ws://localhost:8001');



$handler = function ($request, $response) use ($schema, $context, $icsHandler) {
    Container\set(DID_MATCH, false);
    Container\set(SWOOLE_HTTP_REQUEST_ENDED, false);
    Container\set(SWOOLE_HTTP_REQUEST, $request);
    Container\set(SWOOLE_HTTP_RESPONSE, $response);
    if (Route\get('/meetings/{meeting_id}.ics', $icsHandler)) {
        return;
    }

    try {
        $context->user = maybe(bearer())->bind(function (string $token) use ($context): ?User {
            $token = JWT::decode($token, $context->appKey, ['HS256']);
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

$manager = subscriptions_manager($schema, [], [], $context);
$subscriptions =  graphql_subscriptions($manager, 8001);
$server =  $subscriptions->addlistener('0.0.0.0', 8000, SWOOLE_SOCK_TCP);
$server->set(['open_http_protocol' => true]);
$server->on('request', $handler);
$subscriptions->start();
