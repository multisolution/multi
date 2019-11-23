<?php declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\Service\Order\Order;
use Multi\Service\Request\Request;

class Requests implements Resolver
{
    /**
     * @param Order $root
     * @param array $args
     * @param Context $context
     *
     * @return Request[]
     */
    public function __invoke($root, array $args, Context $context): array
    {
        return $context->db->serviceRequestsByOrder($root);
    }
}
