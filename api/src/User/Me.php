<?php declare(strict_types=1);

namespace Multi\User;

use Multi\Context;
use Multi\Resolver;

class Me implements Resolver
{
    public function __invoke(array $root, array $args, Context $context)
    {
        return $context->user;
    }
}