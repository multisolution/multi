<?php declare(strict_types=1);

namespace Multi\User;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use Multi\User\Permission\CreateUser;
use function Siler\array_get;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        if ((new Permits($context->user))(new CreateUser())) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $input = array_get($args, 'input');
        $email = strtolower(trim(array_get($input, 'email')));
        $password = trim(array_get($input, 'password'));
        $role = array_get($input, 'role');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new UserError($context->messages->get('invalid_email'));
        }

        $user = new User();
        $user->id = $context->id->generate();
        $user->email = $email;
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        $user->role = $role;

        $context->db->insertUser($user);

        return $user;
    }
}
