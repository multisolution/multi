<?php

declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;


class Orders implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        return $context->db->orders();
    }
}
