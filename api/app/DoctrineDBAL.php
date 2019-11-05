<?php declare(strict_types=1);

namespace Multi;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Driver\ResultStatement;
use Doctrine\DBAL\FetchMode;
use Doctrine\DBAL\ParameterType;
use DomainException;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\User\User;
use RuntimeException;

class DoctrineDBAL implements Database
{
    /** @var Connection */
    private $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    public function userById(string $id): ?User
    {
        /** @var ResultStatement $stmt */
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('users')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, User::class);
        $result = $stmt->fetch();

        if ($result === false) {
            return null;
        }

        return $result;
    }

    public function userByEmail(string $email): ?User
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('users')
            ->where('email = ?')
            ->setParameter(0, $email)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, User::class);
        $result = $stmt->fetch();

        if ($result === false) {
            return null;
        }

        return $result;
    }

    public function insertUser(User $user): bool
    {
        /** @var int $affectedRows */
        $affectedRows = $this->conn->createQueryBuilder()
            ->insert('users')
            ->values([
                'id' => '?',
                'email' => '?',
                'password' => '?',
            ])
            ->setParameter(0, $user->id, ParameterType::STRING)
            ->setParameter(1, $user->email, ParameterType::STRING)
            ->setParameter(2, $user->password, ParameterType::STRING)
            ->execute();

        return $affectedRows > 0;
    }

    public function meetingRoomById(string $id): ?MeetingRoom
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        $result = $stmt->fetch();

        if ($result === false) {
            return null;
        }

        return $result;
    }

    public function insertMeetingRoom(MeetingRoom $meetingRoom): bool
    {
        $affectedRows = $this->conn->createQueryBuilder()
            ->insert('meeting_rooms')
            ->values([
                'id' => '?',
                'room_number' => '?',
                'description' => '?',
            ])
            ->setParameter(0, $meetingRoom->id)
            ->setParameter(1, $meetingRoom->roomNumber)
            ->setParameter(2, $meetingRoom->description)
            ->execute();

        return $affectedRows > 0;
    }

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        return $stmt->fetchAll() ?? [];
    }

    public function insertMeeting(Meeting $meeting): bool
    {
        $affectedRows = $this->conn->createQueryBuilder()
            ->insert('meetings')
            ->values([
                'id' => '?',
                'host_id' => '?',
                'room_id' => '?',
                'starts_at' => '?',
                'ends_at' => '?',
            ])
            ->setParameter(0, $meeting->id)
            ->setParameter(1, $meeting->host->id)
            ->setParameter(2, $meeting->room->id)
            ->setParameter(3, $meeting->startsAt->format('Y-m-d H:i:s'))
            ->setParameter(4, $meeting->endsAt->format('Y-m-d H:i:s'))
            ->execute();

        return $affectedRows > 0;
    }

    /**
     * @param MeetingRoom $room
     * @return Meeting[]
     */
    public function meetingsByRoom(MeetingRoom $room): array
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meetings')
            ->where('room_id = ?')
            ->setParameter(0, $room->id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Meeting::class);
        return $stmt->fetchAll() ?? [];
    }

    /**
     * @param User $host
     * @return Meeting[]
     */
    public function meetingsByHost(User $host): array
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meetings')
            ->where('host_id = ?')
            ->setParameter(0, $host->id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Meeting::class);
        return $stmt->fetchAll() ?? [];
    }

    public function meetingRoomByNumber(int $roomNumber): ?MeetingRoom
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->where('room_number = ?')
            ->setParameter(0, $roomNumber)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        $result = $stmt->fetch();

        if ($result === false) {
            return null;
        }

        return $result;
    }

    public function meetingById(string $id): ?Meeting
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meetings')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Meeting::class);
        $result = $stmt->fetch();

        if ($result === false) {
            return null;
        }

        return $result;
    }

    public function updateMeeting(?Meeting $meeting): bool
    {
        $affectedRows = $this->conn->createQueryBuilder()
            ->update('meetings')
            ->values([
                'room_id' => $meeting->room->id,
                'starts_at' => $meeting->startsAt->format('Y-m-d H:i:s'),
                'ends_at' => $meeting->endsAt->format('Y-m-d H:i:s'),
            ]);

        return $affectedRows > 0;
    }

    public function meetingRoomByMeeting(Meeting $meeting): MeetingRoom
    {
        if ($meeting->room !== null) {
            return $meeting->room;
        }

        if (!isset($meeting->room_id)) {
            throw new RuntimeException('Can not figure out meeting room');
        }

        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->where('id = ?')
            ->setParameter(0, $meeting->room_id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        $result = $stmt->fetch();

        if ($result === false) {
            throw new DomainException('Associated room ID doest exists');
        }

        return $result;
    }
}
