<?php declare(strict_types=1);

namespace Multi\Test\User;

use Multi\User\Permission\CreateMeetingRoom;
use Multi\User\Permits;
use Multi\User\Role\Administrator;
use Multi\User\Role\Collaborator;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class PermitsTest extends TestCase
{
    public function testPermits()
    {
        $admin = new User();
        $admin->role = new Administrator();

        $permits = new Permits($admin);
        $this->assertTrue($permits(new CreateMeetingRoom()));

        $user = new User();
        $user->role = new Collaborator();

        $permits = new Permits($user);
        $this->assertFalse($permits(new CreateMeetingRoom()));
    }
}
