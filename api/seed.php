<?php declare(strict_types=1);

use Multi\MeetingRoom\MeetingRoom;
use Multi\User\Role\Administrator;
use Multi\User\User;

$root = new User();
$root->email = 'multi@multisolution.art.br';
$root->password = password_hash('multi', PASSWORD_DEFAULT);
$root->role = new Administrator();
$context->db->insertUser($root);

$meetingRoom = new MeetingRoom();
$meetingRoom->id = 'test';
$meetingRoom->roomNumber = 4;
$context->db->insertMeetingRoom($meetingRoom);