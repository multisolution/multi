<?php declare(strict_types=1);

namespace Multi;

use Multi\Meeting;

return [
    'Meeting' => [
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
        'deleteUser' => new User\Delete(),
    ],
    'DateTime' => new DateTimeScalar(),
    'MeetingStatus' => new Meeting\Status\EnumType(),
    'Role' => new User\Role\EnumType(),
];
