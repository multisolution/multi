<?php declare(strict_types=1);

namespace Multi\Event;

interface Listener
{
    public function listen(Event $event);
}
