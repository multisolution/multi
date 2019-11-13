<?php declare(strict_types=1);

namespace Multi\Event;

use SplObjectStorage;
use function Siler\Monolog\debug;

class Dispatcher
{
    /** @var SplObjectStorage */
    private $listeners;

    public function __construct()
    {
        $this->listeners = new SplObjectStorage();
    }

    public function dispatch(Event $event)
    {
        debug('Event', ['name' => get_class($event)]);

        /** @var Listener $listener */
        foreach ($this->listeners as $listener) {
            $listener->listen($event);
        }
    }

    public function add(Listener $listener): void
    {
        $this->listeners->attach($listener);
    }

    public function remove(Listener $listener): void
    {
        $this->listeners->detach($listener);
    }
}
