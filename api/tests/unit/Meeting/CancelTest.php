<?php declare(strict_types=1);

namespace Multi\Test\Meeting;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Database;
use Multi\InMemoryMessages;
use Multi\Meeting\Resolver\Cancel;
use Multi\Meeting\Meeting;
use Multi\Meeting\Status\Cancelled;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class CancelTest extends TestCase
{
    public function testCancelMeetingNotFound()
    {
        $context = new Context();
        $context->db = $this->createMock(Database::class);
        $context->db->method('meetingById')->willReturn(null);
        $context->messages = new InMemoryMessages();
        $context->user = new User();

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('not_found'));

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);
    }

    public function testCancelNotByTheHost()
    {
        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->host = new User();

        $context = new Context();
        $context->db = $this->createMock(Database::class);
        $context->db->method('meetingById')->willReturn($meeting);
        $context->messages = new InMemoryMessages();
        $context->user = new User();

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('unauthorized'));

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);
    }

    public function testCancel()
    {
        $user = new User();

        $meeting = new Meeting();
        $meeting->id = 'test';
        $meeting->host = $user;

        $context = new Context();
        $context->db = $this->createMock(Database::class);
        $context->db->method('meetingById')->willReturn($meeting);
        $context->user = $user;

        $cancel = new Cancel();
        $cancel(null, ['meetingId' => 'test'], $context);

        $this->assertEquals(new Cancelled(), $meeting->status);
    }
}
