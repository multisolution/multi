<?php declare(strict_types=1);

namespace Multi\MeetingRoom\Resolver;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\MeetingRoom\MeetingRoom;
use Multi\Resolver;
use Multi\User\Role\Permission\CreateMeetingRoom;
use function Multi\User\assert_authorized;
use function Siler\array_get;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        assert_authorized($context, new CreateMeetingRoom());

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
            throw new UserError($context->messages->get('conflict'));
        }

        $context->db->insertMeetingRoom($meetingRoom);

        return $meetingRoom;
    }
}
