<?php declare(strict_types=1);

namespace Multi\Meeting;

use Multi\Event\Event;

class Created implements Event
{
    /**
     * @var Meeting
     */
    private $meeting;

    public function __construct(Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    public function payload(): Meeting
    {
        return $this->meeting;
    }
}
