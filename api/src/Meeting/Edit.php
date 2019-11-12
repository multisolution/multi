<?php

declare(strict_types=1);

namespace Multi\Meeting;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class Edit implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $input = array_get($args, 'input');
        $meetingId = array_get($input, 'id');
        $roomNumber = array_get($input, 'roomNumber');
        $startsAt = array_get($input, 'startsAt');
        $endsAt = array_get($input, 'endsAt');

        $meeting = $context->db->meetingById($meetingId);

        if ($meeting === null) {
            throw new UserError($context->messages->get('not_found'));
        }

        if ($meeting->host !== $context->user) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $meeting->room = $context->db->meetingRoomByNumber($roomNumber);
        $meeting->startsAt = $startsAt;
        $meeting->endsAt = $endsAt;

        if ((new Conflicting())($meeting)) {
            throw new UserError($context->messages->get('meeting_conflicts'));
        }

        $context->db->updateMeeting($meeting);

        return $meeting;
    }
}
