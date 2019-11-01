<?php declare(strict_types=1);

namespace Multi\Test\Meeting;

use DateTime;
use Multi\Meeting\Conflicting;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use PHPUnit\Framework\TestCase;

class ConflictingTest extends TestCase
{
    public function testConflicting()
    {
        $meeting1 = new Meeting();
        $meeting1->startsAt = new DateTime('2019-11-01 15:00:00');
        $meeting1->endsAt = new DateTime('2019-11-01 16:00:00');

        $room = new MeetingRoom();
        $room->calendar = [$meeting1];

        $meeting2 = new Meeting();
        $meeting2->startsAt = new DateTime('2019-11-01 15:30:00');
        $meeting2->endsAt = new DateTime('2019-11-01 16:30:00');
        $meeting2->room = $room;

        $meeting3 = new Meeting();
        $meeting3->startsAt = new DateTime('2019-11-01 14:30:00');
        $meeting3->endsAt = new DateTime('2019-11-01 15:30:00');
        $meeting3->room = $room;

        $meeting4 = new Meeting();
        $meeting4->startsAt = new DateTime('2019-11-01 16:00:00');
        $meeting4->endsAt = new DateTime('2019-11-01 17:00:00');
        $meeting4->room = $room;

        $isConflicting = new Conflicting();

        $this->assertTrue($isConflicting($meeting2));
        $this->assertTrue($isConflicting($meeting3));
        $this->assertFalse($isConflicting($meeting4));
    }
}
