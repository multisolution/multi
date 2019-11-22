<?php declare(strict_types=1);

namespace Multi\Meeting\Resolver;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Meeting\Status\Cancelled;
use Multi\Resolver;
use function Siler\array_get;

class Cancel implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        /** @var string $meetingId */
        $meetingId = array_get($args, 'meetingId');
        $meeting = $context->db->meetingById($meetingId);

        if ($meeting === null) {
            throw new UserError($context->messages->get('not_found'));
        }

        if ($meeting->host !== $context->user) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $meeting->status = new Cancelled();
        $context->db->updateMeeting($meeting);

        return true;
    }
}
