<?php declare(strict_types=1);

namespace Multi\User;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use Multi\User\Permission\CreateUser;
use function Siler\array_get;

class Delete implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        echo "dasdsasdas";
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        if ((new Permits($context->user))(new CreateUser())) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $input = array_get($args, 'input');
        $id = array_get($input, 'id');
        $context->db->deleteUser($id);
        return true;
    }
}
