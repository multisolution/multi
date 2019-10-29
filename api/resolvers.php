<?php declare(strict_types=1);

namespace Multi;

return [
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
        'createMeeting' => new Meeting\Create(),
    ],
    'DateTime' => new DateTimeScalar()
];