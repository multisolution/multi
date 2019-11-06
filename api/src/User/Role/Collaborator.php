<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Permission\Permission;

class Collaborator implements Role
{
    const COLLABORATOR = 'COLLABORATOR';

    /**
     * @return Permission[]
     */
    public function permissions(): array
    {
        return [];
    }

    public function __toString()
    {
        return self::COLLABORATOR;
    }
}
