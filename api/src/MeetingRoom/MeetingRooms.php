<?php declare(strict_types=1);

namespace Multi\MeetingRoom;

use Multi\Context;
use Multi\MeetingRoom;
use Multi\Resolver;

class MeetingRooms implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        $room1 = new MeetingRoom();
        $room1->id = uniqid();

        return [
            $room1,
        ];
    }
}