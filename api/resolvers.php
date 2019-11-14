<?php

declare(strict_types=1);

namespace Multi;

use Multi\Meeting;

return [
    'Meeting' => [
        'room' => new Meeting\Room(),
        'host' => new Meeting\Host(),
    ],
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Calendar(),
    ],
    'Query' => [
        'me' => new User\Me(),
        'meetingRooms' => new MeetingRoom\MeetingRooms(),
        'myMeetings' => new Meeting\MyMeetings(),
        'allUsers' => new User\AllUsers(),
        'calendar' => new Meeting\Calendar(),
        'invite' => new User\Invite\Invitation(),
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
        'updateUser' => new User\Update(),
        'createInvite' => new User\Invite\Create(),
    ],
    'DateTime' => new DateTimeScalar(),
    'MeetingStatus' => new Meeting\Status\EnumType(),
    'Role' => new User\Role\EnumType(),
];
