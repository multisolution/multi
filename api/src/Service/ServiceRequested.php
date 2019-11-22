<?php

declare(strict_types=1);

namespace Multi\Service;


use Multi\Context;
use Multi\Resolver;

class ServiceRequested implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {

        return $context->db->requestedServices();
    }
}
