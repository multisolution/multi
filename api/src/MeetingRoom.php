<?php declare(strict_types=1);

namespace Multi;

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
}