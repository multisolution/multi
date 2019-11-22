<?php declare(strict_types=1);

namespace Multi\Service;

use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;

class Request
{
    /** @var string */
    public $id;
    /** @var Service */
    public $service;
    /** @var MeetingRoom */
    public $room;
    /** @var User */
    public $host;
    /** @var int */
    public $total;
    /** @var bool */
    public $done;
}
