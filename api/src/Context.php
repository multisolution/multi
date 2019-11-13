<?php declare(strict_types=1);

namespace Multi;

use Multi\Event\Dispatcher;
use Multi\Event\Event;
use Multi\User\User;

class Context
{
    /** @var bool */
    public $debug;
    /** @var User|null */
    public $user;
    /** @var Database */
    public $db;
    /** @var string */
    public $appKey;
    /** @var IDGenerator */
    public $id;
    /** @var Messages */
    public $messages;
    /** @var Dispatcher */
    public $dispatcher;

    /**
     * Sugar for Dispatcher to avoid repeating $context->dispatcher->dispatch.
     *
     * @param Event $event
     */
    public function dispatch(Event $event)
    {
        $this->dispatcher->dispatch($event);
    }
}
