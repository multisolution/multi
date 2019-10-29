<?php declare(strict_types=1);

namespace Multi\Meeting;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError('Meetings without hosts not allowed');
        }

        $meeting = new Meeting();
        $meeting->id = $context->id->generate();
        $meeting->room = $context->db->meetingRoomById($args['input']['roomId']);
        $meeting->startsAt = $args['input']['startsAt'];
        $meeting->endsAt = $args['input']['endsAt'];
        $meeting->host = $context->user;

        $context->db->insertMeeting($meeting);

        return $meeting;
    }
}