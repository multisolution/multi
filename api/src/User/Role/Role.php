<?php declare(strict_types=1);

namespace Multi\User\Role;

use Multi\User\Permission\Permission;

interface Role
{
    /**
     * @return Permission[]
     */
    public function permissions(): array;

    public function __toString();
}
