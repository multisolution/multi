<?php declare(strict_types=1);

namespace Multi\User\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\User\Role\Permission\DeleteUser as DeleteUserPermission;
use function Multi\User\assert_authorized;
use function Siler\array_get;

class Delete implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        assert_authorized($context, new DeleteUserPermission());

        $id = array_get($args, 'userId');

        $context->db->deleteUser($id);

        return true;
    }
}
