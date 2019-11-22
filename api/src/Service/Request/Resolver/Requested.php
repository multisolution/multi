<?php declare(strict_types=1);

namespace Multi\Service\Request\Resolver;

use Multi\Context;
use Multi\Resolver;

class Requested implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return $root;
    }
}
