<?php declare(strict_types=1);

namespace Multi\Meeting;

use Multi\Context;
use Multi\Resolver;

class MyMeetings implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            return [];
        }

        return $context->db->meetingsByHost($context->user);
    }
}