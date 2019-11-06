<?php declare(strict_types=1);

namespace Multi\User;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use Multi\User\Permission\DeleteUser;
use Multi\User\Permission\Permits;
use function Siler\array_get;

class Delete implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        if (!(new Permits($context->user))(new DeleteUser())) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $id = array_get($args, 'userId');
        $context->db->deleteUser($id);
        return true;
    }
}
