<?php declare(strict_types=1);

namespace Multi\User\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\User\User;
use function Multi\User\assert_authenticated;
use function Siler\array_get;

class Update implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        assert_authenticated($context);

        $input = array_get($args, 'userInput');
        $user = new User();
        $user->id = array_get($input, 'id');
        $user->email = strtolower(trim(array_get($input, 'email')));
        $user->password = password_hash(trim(array_get($input, 'password')), PASSWORD_DEFAULT);
        $context->db->updateUser($user);
        return true;
    }
}
