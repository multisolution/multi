<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Permission;
use Multi\User\Role;

class Administrator implements Role
{
    public function permissions(): array
    {
        return [
            new Permission\CreateMeetingRoom(),
        ];
    }

    static function scalar(): string
    {
        return 'ADMINISTRATOR';
    }
}
