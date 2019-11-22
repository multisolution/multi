<?php declare(strict_types=1);

namespace Multi\Test\Meeting;

use DateTime;
use Multi\Context;
use Multi\Database;
use Multi\InMemoryDb;
use Multi\InMemoryMessages;
use Multi\Meeting\Edit;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class EditTest extends TestCase
{
    public function testEdit()
    {
        $initialStartsAt = new DateTime('2019-11-03 17:00:00');
        $initialEndsAt = new DateTime('2019-11-03 18:00:00');
        $editedStartsAt = new DateTime('2019-11-04 17:00:00');
        $editedEndsAt = new DateTime('2019-11-04 18:00:00');

        $context = new Context();
        $context->messages = new InMemoryMessages();
        $context->db = $this->createMock(Database::class);
        $context->user = new User();

        $meetingRoom = new MeetingRoom();
        $meetingRoom->roomNumber = 1;

        $meetingRoom2 = new MeetingRoom();
        $meetingRoom2->roomNumber = 2;
        $meetingRoom2->calendar = [];
        $context->db->method('meetingRoomByNumber')->willReturn($meetingRoom2);

        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->room = $meetingRoom;
        $meeting->startsAt = $initialStartsAt;
        $meeting->endsAt = $initialEndsAt;
        $meeting->host = $context->user;
        $context->db->method('meetingById')->willReturn($meeting);

        $args = [
            'input' => [
                'id' => 'test',
                'title' => 'Just testing',
                'roomNumber' => 2,
                'startsAt' => $editedStartsAt,
                'endsAt' => $editedEndsAt,
            ],
        ];

        $edit = new Edit();

        $this->assertSame(1, $meeting->room->roomNumber);
        $this->assertEquals($initialStartsAt, $meeting->startsAt);
        $this->assertEquals($initialEndsAt, $meeting->endsAt);

        $edit(null, $args, $context);
        $editedMeeting = $context->db->meetingById('test');

        $this->assertSame(2, $editedMeeting->room->roomNumber);
        $this->assertEquals($editedStartsAt, $editedMeeting->startsAt);
        $this->assertEquals($editedEndsAt, $editedMeeting->endsAt);
    }
}
