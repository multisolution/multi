<?php

declare(strict_types=1);

namespace Multi;

use Multi\Meeting;
use Multi\Service;

return [
    'Meeting' => [
        'room' => new Meeting\Resolver\Room(),
        'host' => new Meeting\Resolver\Host(),
    ],
    'ServiceOrder' => [
        'meeting' => new Service\Order\Resolver\Meeting(),
        'requests' => new Service\Order\Resolver\Requests(),
    ],
    'ServiceRequest' => [
        'service' => new Service\Request\Resolver\Service(),
    ],
    'MeetingRoom' => [
        'calendar' => new MeetingRoom\Resolver\Calendar(),
    ],
    'Subscription' => [
        'serviceOrdered' => new Service\Order\Resolver\Ordered(),
    ],
    'Query' => [
        'me' => new User\Resolver\Me(),
        'meetingRooms' => new MeetingRoom\Resolver\MeetingRooms(),
        'services' => new Service\Resolver\Services(),
        'orders' => new Service\Order\Resolver\Orders(),
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
        'createInvite' => new User\Invite\Resolver\Create(),
        'delivered' => new Service\Order\Resolver\Delivered(),
        'placeOrder' => new Service\Order\Resolver\Place(),
    ],
    'DateTime' => new DateTimeScalar(),
    'MeetingStatus' => new Meeting\Status\EnumType(),
    'Role' => new User\Role\EnumType(),
];
