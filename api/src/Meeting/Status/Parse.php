<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

use RuntimeException;

class Parse
{
    public function __invoke(string $status): Status
    {
        switch ($status) {
            case Scheduled::SCHEDULED:
                return new Scheduled();

            case Cancelled::CANCELLED:
                return new Cancelled();
        }

        throw new RuntimeException("Could not parse MeetingStatus $status");
    }
}
