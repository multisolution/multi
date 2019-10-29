<?php declare(strict_types=1);

namespace Multi;

interface Database
{
    public function userById(string $id): ?User;

    public function userByEmail(string $email): ?User;

    public function insertUser(User $user): string;

    public function meetingRoomById(string $id): ?MeetingRoom;

    public function insertMeetingRoom(MeetingRoom $meetingRoom): void;

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array;

    public function insertMeeting(Meeting $meeting);

    /**
     * @param MeetingRoom $room
     * @return Meeting[]
     */
    public function meetingsByRoom(MeetingRoom $room): array;
}