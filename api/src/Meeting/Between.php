<?php declare(strict_types=1);

namespace Multi\Meeting;

use DateTime;

class Between
{
    /** @var Meeting */
    private $meeting;

    public function __construct(Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    public function __invoke(DateTime $dateTime): bool
    {
        return $dateTime >= $this->meeting->startsAt && $dateTime < $this->meeting->endsAt;
    }
}