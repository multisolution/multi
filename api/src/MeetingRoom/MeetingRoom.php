<?php declare(strict_types=1);

namespace Multi\MeetingRoom;

use Multi\Meeting\Meeting;

class MeetingRoom
{
    /** @var string */
    public $id;
    /** @var int */
    public $roomNumber;
    /** @var Meeting[] */
    public $calendar;
    /** @var string */
    public $description;

    public function __construct()
    {
        if (isset($this->room_number)) {
            $this->roomNumber = $this->room_number;
        }
    }
}
