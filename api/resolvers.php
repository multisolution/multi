<?php declare(strict_types=1);

namespace Multi;

return [
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Calendar(),
    ],
    'Query' => [
        'me' => new User\Me(),
        'meetingRooms' => new MeetingRoom\MeetingRooms(),
    ],
    'Mutation' => [
        'signIn' => new User\SignIn()
    ]
];