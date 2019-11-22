<?php declare(strict_types=1);

namespace Multi\Service\Request\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\Service\Request\Request;

class Service implements Resolver
{
    /**
     * @param Request $root
     * @param array $args
     * @param Context $context
     *
     * @return \Multi\Service\Service
     */
    public function __invoke($root, array $args, Context $context): \Multi\Service\Service
    {
        return $context->db->serviceByRequest($root);
    }
}
