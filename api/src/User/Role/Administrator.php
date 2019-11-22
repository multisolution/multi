<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Role\Permission;

class Administrator implements Role
{
    const ADMINISTRATOR = 'ADMINISTRATOR';

    /**
     * @return Permission\Permission[]
     */
    public function permissions(): array
    {
        return [
            new Permission\CreateMeetingRoom(),
            new Permission\DeleteUser(),
            new Permission\CreateUser(),
            new Permission\CreateInvite(),
        ];
    }

    public function __toString()
    {
        return self::ADMINISTRATOR;
    }
}
