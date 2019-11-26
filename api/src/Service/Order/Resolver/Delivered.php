<?php

declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use Multi\Context;
use Multi\Resolver;


class Delivered implements Resolver
{
    /**
     * @param array $root
     * @param Context $context
     *
     */
    public function __invoke($root, array $args, Context $context)
    {
        $result = $context->db->deliveryOrderById($args['orderId']);
        return $result;
    }
}
