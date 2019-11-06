<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Permission\CreateMeetingRoom;
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
        ];
    }

    public function __toString()
    {
        return self::ADMINISTRATOR;
    }
}
