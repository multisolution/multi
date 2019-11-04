<?php declare(strict_types=1);

namespace Multi\User;

use function Siler\Functional\any;

class Permits
{
    /** @var User */
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function __invoke(Permission $permission): bool
    {
        return any(array_map(function (Permission $rolePermission) {
            return function (Permission $permission) use ($rolePermission) {
                return $rolePermission == $permission;
            };
        }, $this->user->role->permissions()))($permission);
    }
}