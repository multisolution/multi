<?php declare(strict_types=1);

namespace Multi\User\Resolver;

use Multi\Context;
use Multi\Resolver;

class Me implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return $context->user;
    }
}
