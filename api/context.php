<?php

declare(strict_types=1);

namespace Multi;

use Multi\Context;
use Multi\UniqueId;
use Multi\InMemoryMessages;
use Siler\Dotenv as Env;
use Multi\Event\Dispatcher;
use SendGrid;






$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";
$dbs = include "$base_dir/app/dbs.php";
$dispatcher = new Dispatcher();
$dispatcher->add(new SendGridListener(new SendGrid(Env\env('SENDGRID_API_KEY')), Env\env('SENDGRID_API_FROM')));
$context = new Context();
$context->debug = Env\bool_val('APP_DEBUG', false);
$context->db = $dbs[Env\env('APP_DB_USE', 'in_memory')](Env\env('APP_DB_URI'));
$context->appKey = Env\env('APP_KEY');
$context->id = new UniqueId();
$context->messages = new InMemoryMessages();
$context->dispatcher = $dispatcher;






return $context;
