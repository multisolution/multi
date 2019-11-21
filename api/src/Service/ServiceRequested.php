<?php

declare(strict_types=1);

namespace Multi\Service;


use Multi\Context;
use Multi\Resolver;

class ServiceRequested implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return [[
            "service" => ['id' => 'service' . rand(1, 9)]
        ]];
    }
}
