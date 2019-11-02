<?php declare(strict_types=1);

namespace Multi\Test\Meeting;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\InMemoryDb;
use Multi\InMemoryMessages;
use Multi\Meeting\Cancel;
use Multi\Meeting\Meeting;
use Multi\Meeting\Status\Cancelled;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class CancelTest extends TestCase
{
    public function testCancelMeetingNotFound()
    {
        $context = new Context();
        $context->db = new InMemoryDb();
        $context->messages = new InMemoryMessages();

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('meeting_not_found'));

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);
    }

    public function testCancelNotByTheHost()
    {
        $context = new Context();
        $context->db = new InMemoryDb();
        $context->messages = new InMemoryMessages();

        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->host = new User();

        $context->db->insertMeeting($meeting);

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('host_only_cancel'));

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);
    }

    public function testCancel()
    {
        $user = new User();

        $context = new Context();
        $context->db = new InMemoryDb();
        $context->user = $user;

        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->host = $user;

        $context->db->insertMeeting($meeting);

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);

        $this->assertEquals(new Cancelled(), $meeting->status);
    }
}
