<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Role;

class Collaborator implements Role
{
    public function permissions(): array
    {
        return [];
    }
}