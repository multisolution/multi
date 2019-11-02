<?php declare(strict_types=1);

namespace Multi\Test;

use Multi\InMemoryDb;
use Multi\Meeting\Meeting;
use Multi\Meeting\Status\Cancelled;
use Multi\Meeting\Status\Scheduled;
use PHPUnit\Framework\TestCase;

class InMemoryDbTest extends TestCase
{
    public function testUpdateMeeting()
    {
        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->status = new Scheduled();

        $db = new InMemoryDb();
        $db->insertMeeting($meeting);

        $this->assertSame($db->meetingById('test'), $meeting);
        $this->assertEquals(new Scheduled(), $db->meetingById('test')->status);

        $db->meetingById('test')->status = new Cancelled();
        $db->updateMeeting($db->meetingById('test'));
        $this->assertEquals(new Cancelled(), $db->meetingById('test')->status);
    }
}
