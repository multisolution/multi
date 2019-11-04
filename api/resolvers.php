<?php declare(strict_types=1);

namespace Multi;

return [
    'Meeting' => [
        'status' => new Meeting\Status\Parser(),
    ],
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Calendar(),
    ],
    'Query' => [
        'me' => new User\Me(),
        'meetingRooms' => new MeetingRoom\MeetingRooms(),
        'myMeetings' => new Meeting\MyMeetings(),
    ],
    'Mutation' => [
        'signIn' => new User\SignIn(),
        'signOut' => new User\SignOut(),
        'createMeeting' => new Meeting\Create(new Meeting\Conflicting()),
        'createMeetingRoom' => new MeetingRoom\Create(),
        'cancelMeeting' => new Meeting\Cancel(),
        'editMeeting' => new Meeting\Edit(),
    ],
    'DateTime' => new DateTimeScalar(),
];
