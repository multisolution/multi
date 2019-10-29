<?php declare(strict_types=1);

namespace Multi;

use DateTime;

class Meeting
{
    /** @var string */
    public $id;
    /** @var User */
    public $host;
    /** @var MeetingRoom */
    public $room;
    /** @var DateTime */
    public $startsAt;
    /** @var DateTime */
    public $endsAt;
}