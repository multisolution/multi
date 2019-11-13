<?php declare(strict_types=1);

namespace Multi;

use DateTimeInterface;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;
use function Siler\Functional\head;

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

    public function insertUser(User $user): bool
    {
        $user->id = uniqid();
        $this->users[] = $user;
        return true;
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

    public function insertMeetingRoom(MeetingRoom $meetingRoom): bool
    {
        $this->meetingRooms[] = $meetingRoom;
        return true;
    }

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array
    {
        return $this->meetingRooms;
    }

    public function insertMeeting(Meeting $meeting): bool
    {
        $this->meetings[] = $meeting;
        return true;
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

    /**
     * @param User $host
     * @return Meeting[]
     */
    public function meetingsByHost(User $host): array
    {
        $results = array_filter($this->meetings, function (Meeting $meeting) use ($host): bool {
            return $meeting->host === $host;
        });

        return $results;
    }

    public function meetingRoomByNumber(int $roomNumber): ?MeetingRoom
    {
        $results = array_filter($this->meetingRooms, function (MeetingRoom $meetingRoom) use ($roomNumber): bool {
            return $meetingRoom->roomNumber === $roomNumber;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function meetingById(string $id): ?Meeting
    {
        $results = array_filter($this->meetings, function (Meeting $meeting) use ($id): bool {
            return $meeting->id === $id;
        });

        return head($results);
    }

    public function updateMeeting(?Meeting $meeting): bool
    {
        $index = array_search($meeting, $this->meetings);
        array_splice($this->meetings, $index, 1, [$meeting]);
        return true;
    }

    public function meetingRoomByMeeting(Meeting $meeting): MeetingRoom
    {
        return $this->meetingRoomById($meeting->room->id);
    }

    /**
     * @return User[]
     */
    public function users(): array
    {
        // TODO: Implement users() method.
    }

    public function deleteUser(string $id): bool
    {
        // TODO: Implement deleteUser() method.
    }

    /**
     * @param DateTimeInterface $from
     * @param DateTimeInterface $to
     *
     * @return Meeting[]
     */
    public function meetings(DateTimeInterface $from, DateTimeInterface $to): array
    {
        // TODO: Implement meetings() method.
    }

    public function updateUser(User $user): bool
    {
        // TODO: Implement updateUser() method.
    }
}
