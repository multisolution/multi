<?php declare(strict_types=1);

namespace Multi\Meeting;

use DateTime;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;

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