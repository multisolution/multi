<?php declare(strict_types=1);

namespace Multi\Service\Request\Resolver;

use Multi\Context;
use Multi\Resolver;

class Host implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return $context->db->userById($root->host_id);
    }
}
