<?php declare(strict_types=1);

namespace Multi\Meeting;

use DateInterval;
use DatePeriod;
use DateTime;
use Multi\Meeting\Status\Parse;
use Multi\Meeting\Status\Status;
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
    /** @var Status */
    public $status;
    /** @var DatePeriod */
    public $period;

    public function __construct()
    {
        if (isset($this->starts_at)) {
            if (is_string($this->starts_at)) {
                $this->startsAt = DateTime::createFromFormat('Y-m-d H:i:s', $this->starts_at);
            }
        }

        if (isset($this->ends_at)) {
            if (is_string($this->ends_at)) {
                $this->endsAt = DateTime::createFromFormat('Y-m-d H:i:s', $this->ends_at);
            }
        }

        if (is_string($this->status)) {
            $this->status = (new Parse())($this->status);
        }

        if ($this->startsAt !== null && $this->endsAt !== null) {
            $this->period = new DatePeriod($this->startsAt, new DateInterval('PT15M'), $this->endsAt);
        }
    }
}
