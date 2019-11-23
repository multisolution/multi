<?php declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\Service\Order\Order;

class Ordered implements Resolver
{
    /**
     * @param array $root
     * @param array $args
     * @param Context $context
     *
     * @return Order|array
     */
    public function __invoke($root, array $args, Context $context)
    {
        if (array_key_exists('id', $root)) {
            return $context->db->orderById($root['id']);
        }

        return [];
    }
}
