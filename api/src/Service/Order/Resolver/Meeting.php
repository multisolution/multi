<?php declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use Multi\Context;
use Multi\Resolver;

class Meeting implements Resolver
{
    public function __invoke($root, array $args, Context $context): \Multi\Meeting\Meeting
    {
        var_dump($root);

        return $context->db->meetingByServiceOrder($root);
    }
}
