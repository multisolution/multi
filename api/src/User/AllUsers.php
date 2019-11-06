<?php declare(strict_types=1);

namespace Multi\User;

use Multi\Context;
use Multi\Resolver;

class AllUsers implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        $users = $context->db->users();
        var_dump($users);
        return $users;
    }
}
