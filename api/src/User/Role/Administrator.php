<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Permission\CreateMeetingRoom;
use Multi\User\Permission\DeleteUser;
use Multi\User\Permission\CreateUser;
use Multi\User\Permission\Permission;

class Administrator implements Role
{


    const ADMINISTRATOR = 'ADMINISTRATOR';

    /**
     * @return Permission[]
     */
    public function permissions(): array
    {
        return [
            new CreateMeetingRoom(),
            new DeleteUser(),
            new CreateUser(),

        ];
    }

    public function __toString()
    {
        return self::ADMINISTRATOR;
    }
}
