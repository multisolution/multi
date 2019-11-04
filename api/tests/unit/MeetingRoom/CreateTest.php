<?php declare(strict_types=1);

namespace Multi\Test\MeetingRoom;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\IDGenerator;
use Multi\InMemoryDb;
use Multi\InMemoryMessages;
use Multi\MeetingRoom\Create;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\Role\Administrator;
use Multi\User\Role\Collaborator;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class CreateTest extends TestCase
{
    public function testCreateUnauthenticated()
    {
        $context = new Context();
        $context->messages = new InMemoryMessages();

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('unauthenticated'));

        $create = new Create();
        $create(null, [], $context);
    }

    public function testCreateUnauthorized()
    {
        $context = new Context();
        $context->messages = new InMemoryMessages();
        $context->user = new User();
        $context->user->role = new Collaborator();

        $this->expectException(UserError::class);
        $this->expectExceptionMessage($context->messages->get('unauthorized'));

        $create = new Create();
        $create(null, [], $context);
    }

    public function testCreate()
    {
        $context = new Context();
        $context->messages = new InMemoryMessages();
        $context->user = new User();
        $context->user->role = new Administrator();
        $context->db = new InMemoryDb();
        $context->id = new class implements IDGenerator
        {
            public function generate(): string
            {
                return 'test';
            }
        };


        $create = new Create();
        $create(null, [
            'input' => [
                'roomNumber' => 1
            ]
        ], $context);

        $this->assertInstanceOf(MeetingRoom::class, $context->db->meetingRoomById('test'));
    }
}
