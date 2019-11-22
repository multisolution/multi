<?php declare(strict_types=1);

namespace Multi\MeetingRoom\Resolver;

use Multi\Context;
use Multi\Resolver;

class Calendar implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        return $context->db->meetingsByRoom($root);
    }
}
