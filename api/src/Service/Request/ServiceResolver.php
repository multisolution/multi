<?php

declare(strict_types=1);

namespace Multi\Service\Request;


use Multi\Context;
use Multi\Resolver;

class ServiceResolver implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return $context->db->serviceById($root);
    }
}
