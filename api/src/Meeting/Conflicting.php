<?php declare(strict_types=1);

namespace Multi\Meeting;

use Closure;
use function Siler\Functional\any;

class Conflicting
{
    public function __invoke(Meeting $meeting): bool
    {
        $checks = array_map(function (Meeting $roomMeeting): Closure {
            return function (Meeting $meeting) use ($roomMeeting): bool {
                $between = new Between($roomMeeting);
                return $between($meeting->startsAt) || $between($meeting->endsAt);
            };
        }, $meeting->room->calendar);

        return any($checks)($meeting);
    }
}