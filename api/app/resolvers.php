<?php declare(strict_types=1);

namespace Multi;

use Multi\Meeting;
use Multi\Service;

return [
    'Meeting' => [
        'room' => new Meeting\Resolver\Room(),
        'host' => new Meeting\Resolver\Host(),
    ],
    'Request' => [
        'room' => new Service\Request\Resolver\Room(),
        'service' => new Service\Request\Resolver\Request(),
        'host' => new Service\Request\Resolver\Host(),
    ],
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Resolver\Calendar(),
    ],
    'Subscription' => [
        'serviceRequested' => new Service\Request\Resolver\Requested(),
    ],
    'Query' => [
        'me' => new User\Resolver\Me(),
        'meetingRooms' => new MeetingRoom\Resolver\MeetingRooms(),
        'services' => new Service\Resolver\Services(),
        'myMeetings' => new Meeting\Resolver\MyMeetings(),
        'allUsers' => new User\Resolver\Users(),
        'calendar' => new Meeting\Resolver\Calendar(),
        'invite' => new User\Invite\Resolver\Invitation(),
    ],
    'Mutation' => [
        'signIn' => new User\Resolver\SignIn(),
        'signOut' => new User\Resolver\SignOut(),
        'createUser' => new User\Resolver\Create(),
        'createMeeting' => new Meeting\Resolver\Create(new Meeting\Conflicting()),
        'createMeetingRoom' => new MeetingRoom\Resolver\Create(),
        'cancelMeeting' => new Meeting\Resolver\Cancel(),
        'editMeeting' => new Meeting\Resolver\Edit(),
        'deleteUser' => new User\Resolver\Delete(),
        'updateUser' => new User\Resolver\Update(),
        'requestService' => new Service\Request\Resolver\Create(),
        'createInvite' => new User\Invite\Resolver\Create(),
    ],
    'DateTime' => new DateTimeScalar(),
    'MeetingStatus' => new Meeting\Status\EnumType(),
    'Role' => new User\Role\EnumType(),
];
