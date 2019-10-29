<?php declare(strict_types=1);

namespace Multi\MeetingRoom;

use Multi\Context;
use Multi\Meeting;
use Multi\Resolver;

class Calendar implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        $meeting = new Meeting();
        $meeting->id = uniqid();

        return [
            $meeting,
        ];
    }
}