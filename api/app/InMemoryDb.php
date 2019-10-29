<?php declare(strict_types=1);

namespace Multi;

class InMemoryDb implements Database
{
    /** @var User[] */
    private $users;
    /** @var MeetingRoom[] */
    private $meetingRooms;
    /** @var Meeting[] */
    private $meetings;

    public function __construct()
    {
        $this->users = [];
        $this->meetingRooms = [];
        $this->meetings = [];
    }

    public function userById(string $id): ?User
    {
        $results = array_filter($this->users, function (User $user) use ($id): bool {
            return $user->id === $id;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function userByEmail($email): ?User
    {
        $results = array_filter($this->users, function (User $user) use ($email): bool {
            return $user->email === $email;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function insertUser(User $user): string
    {
        $user->id = uniqid();
        $this->users[] = $user;
        return $user->id;
    }

    public function meetingRoomById(string $id): ?MeetingRoom
    {
        $results = array_filter($this->meetingRooms, function (MeetingRoom $meetingRoom) use ($id): bool {
            return $meetingRoom->id === $id;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function insertMeetingRoom(MeetingRoom $meetingRoom): void
    {
        $this->meetingRooms[] = $meetingRoom;
    }

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array
    {
        return $this->meetingRooms;
    }

    public function insertMeeting(Meeting $meeting)
    {
        $this->meetings[] = $meeting;
    }

    /**
     * @param MeetingRoom $room
     * @return Meeting[]
     */
    public function meetingsByRoom(MeetingRoom $room): array
    {
        $results = array_filter($this->meetings, function (Meeting $meeting) use ($room): bool {
            return $meeting->room === $room;
        });

        return $results;
    }
}