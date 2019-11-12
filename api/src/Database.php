<?php

declare(strict_types=1);

namespace Multi;

use DateTimeInterface;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;

interface Database
{
    public function userById(string $id): ?User;

    public function userByEmail(string $email): ?User;

    public function insertUser(User $user): bool;

    public function meetingRoomById(string $id): ?MeetingRoom;

    public function insertMeetingRoom(MeetingRoom $meetingRoom): bool;

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array;

    /**
     * @return User[]
     */
    public function users(): array;

    public function deleteUser(string $id): bool;
    public function updateUser(User $user): bool;

    public function insertMeeting(Meeting $meeting): bool;

    /**
     * @param MeetingRoom $room
     * @return Meeting[]
     */
    public function meetingsByRoom(MeetingRoom $room): array;

    /**
     * @param User $host
     * @return Meeting[]
     */
    public function meetingsByHost(User $host): array;

    public function meetingRoomByNumber(int $roomNumber): ?MeetingRoom;

    public function meetingById(string $id): ?Meeting;

    public function updateMeeting(?Meeting $meeting): bool;

    public function meetingRoomByMeeting(Meeting $meeting): MeetingRoom;

    /**
     * @param DateTimeInterface $from
     * @param DateTimeInterface $to
     *
     * @return Meeting[]
     */
    public function meetings(DateTimeInterface $from, DateTimeInterface $to): array;
}
