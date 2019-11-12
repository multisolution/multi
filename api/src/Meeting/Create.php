<?php declare(strict_types=1);

namespace Multi\Meeting;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Meeting\Status\Scheduled;
use Multi\Resolver;

class Create implements Resolver
{
    /** @var Conflicting */
    private $conflicting;

    public function __construct(Conflicting $conflicting)
    {
        $this->conflicting = $conflicting;
    }

    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        $meeting = new Meeting();
        $meeting->id = $context->id->generate();
        $meeting->room = $context->db->meetingRoomById($args['input']['roomId']);
        $meeting->startsAt = $args['input']['startsAt'];
        $meeting->endsAt = $args['input']['endsAt'];
        $meeting->host = $context->user;
        $meeting->status = new Scheduled();
        $meeting->title = $args['input']['title'];

        // Lazy-load room calendar
        $meeting->room->calendar = $context->db->meetingsByRoom($meeting->room);

        if (($this->conflicting)($meeting)) {
            throw new UserError($context->messages->get('conflicting_meeting'));
        }

        $context->db->insertMeeting($meeting);

        return $meeting;
    }
}
