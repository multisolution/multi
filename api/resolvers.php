<?php declare(strict_types=1);

namespace Multi;

use GraphQL\Type\Definition\EnumType;
use Multi\User\Role\Administrator;
use Multi\User\Role\Collaborator;

return [
    'Meeting' => [
        'status' => new Meeting\Status\Parser(),
        'room' => new Meeting\Room(),
    ],
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Calendar(),
    ],
    'Query' => [
        'me' => new User\Me(),
        'meetingRooms' => new MeetingRoom\MeetingRooms(),
        'myMeetings' => new Meeting\MyMeetings(),
        'allUsers' => new User\AllUsers(),
    ],
    'Mutation' => [
        'signIn' => new User\SignIn(),
        'signOut' => new User\SignOut(),
        'createUser' => new User\Create(),
        'createMeeting' => new Meeting\Create(new Meeting\Conflicting()),
        'createMeetingRoom' => new MeetingRoom\Create(),
        'cancelMeeting' => new Meeting\Cancel(),
        'editMeeting' => new Meeting\Edit(),
    ],
    'DateTime' => new DateTimeScalar(),
    'Role' => new EnumType([
        'name' => 'Role',
        'values' => [
            Administrator::scalar() => new Administrator(),
            Collaborator::scalar() => new Collaborator(),
        ]
    ])
];
