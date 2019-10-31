<?php declare(strict_types=1);

namespace Multi\MeetingRoom;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        /** @var array $input */
        $input = array_get($args, 'input');
        /** @var int $room_number */
        $room_number = array_get($input, 'roomNumber');
        /** @var string $description */
        $description = array_get($input, 'description');

        $meetingRoom = new MeetingRoom();
        $meetingRoom->id = $context->id->generate();
        $meetingRoom->roomNumber = $room_number;
        $meetingRoom->description = $description;

        if ($context->db->meetingRoomByNumber($room_number) !== null) {
            throw new UserError($context->messages->get('room_number_already_exists'));
        }

        $context->db->insertMeetingRoom($meetingRoom);

        return $meetingRoom;
    }
}