<?php declare(strict_types=1);

namespace Multi\User;

use Multi\Context;
use Multi\Resolver;

class SignOut implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return true;
    }
}