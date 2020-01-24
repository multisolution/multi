<?php

declare(strict_types=1);

namespace Multi;

use DateTimeInterface;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Driver\ResultStatement;
use Doctrine\DBAL\FetchMode;
use DomainException;
use GraphQL\Error\UserError;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\Service\Order;
use Multi\Service\Request\Request;
use Multi\Service\Service;
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

    public function deleteUser(string $id): bool
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->delete('users')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();
        return $stmt > 0;
    }

    public function userById(string $id): ?User
    {
        /** @var ResultStatement $stmt */
        $stmt = $this->conn
            ->createQueryBuilder()
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

    public function updateUser(User $user): bool
    {
        $stmt = $this->conn->createQueryBuilder()
            ->update('users')
            ->where('id = :id')
            ->setParameter('id', $user->id);
        $stmt->set('email', $stmt->createNamedParameter($user->email));
        $stmt->set('password', $stmt->createNamedParameter($user->password));
        $result = $stmt->execute();

        if (is_int($result)) {
            return $result > 0;
        }

        return false;
    }

    public function userByEmail(string $email): ?User
    {
        $stmt = $this->conn
            ->createQueryBuilder()
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
        $affectedRows = $this->conn
            ->createQueryBuilder()
            ->insert('users')
            ->values([
                'id' => '?',
                'email' => '?',
                'password' => '?',
                'role' => '?'
            ])
            ->setParameter(0, $user->id)
            ->setParameter(1, $user->email)
            ->setParameter(2, $user->password)
            ->setParameter(3, $user->role)
            ->execute();

        return $affectedRows > 0;
    }

    public function meetingRoomById(string $id): ?MeetingRoom
    {
        $stmt = $this->conn
            ->createQueryBuilder()
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

    public function serviceByRequest(Request $request): Service
    {
        if (!isset($request->service_id)) {
            throw new UserError('Could not find a service by request');
        }

        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('services')
            ->where('id = ?')
            ->setParameter(0, $request->service_id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Service::class);
        $result = $stmt->fetch();

        if ($result === false) {
            throw new UserError('Could not find a service by request');
        }

        return $result;
    }

    public function orders(): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('service_orders')
            ->where('timestamp >= now() - interval \'24 hours\'')
            ->andWhere('fulfilled = False')
            ->orderBy("timestamp", 'DESC')
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Order::class);
        return $stmt->fetchAll() ?? [];
    }

    public function meetingRoomByServiceRequest(Request $request): MeetingRoom
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->where('id=?')
            ->setParameter(0, $request->room_id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        $result = $stmt->fetch();

        if ($result === false) {
            throw new UserError('Não encoutrei salas no request');
        }

        return $result;
    }


    public function deliveryOrderById(String $orderId): bool
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->update('service_orders')
            ->where('id = ?')
            ->setParameter(0, $orderId);

        $stmt->set('fulfilled', "true");

        $result = $stmt->execute();

        if (is_int($result)) {
            return $result > 0;
        }

        return false;
    }

    public function insertMeetingRoom(MeetingRoom $meetingRoom): bool
    {
        $data = [
            'id' => $meetingRoom->id,
            'room_number' => $meetingRoom->roomNumber,
            'description' => $meetingRoom->description,
        ];

        return $this->insert('meeting_rooms', $data);
    }

    /**
     * @return User[]
     */
    public function users(): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('users')
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, User::class);
        return $stmt->fetchAll() ?? [];
    }

    public function services(): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('services')
            ->execute();


        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Service::class);
        return $stmt->fetchAll() ?? [];
    }

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('meeting_rooms')
            ->orderBy('room_number')
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, MeetingRoom::class);
        return $stmt->fetchAll() ?? [];
    }

    public function insertMeeting(Meeting $meeting): bool
    {
        $data = [
            'id' => $meeting->id,
            'room_id' => $meeting->room->id,
            'host_id' => $meeting->host->id,
            'title' => $meeting->title,
            'starts_at' => $meeting->startsAt->format('Y-m-d H:i:s'),
            'ends_at' => $meeting->endsAt->format('Y-m-d H:i:s'),
            'status' => $meeting->status,
        ];

        return $this->insert('meetings', $data);
    }

    /**
     * @param MeetingRoom $room
     * @return Meeting[]
     */
    public function meetingsByRoom(MeetingRoom $room): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
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
        $stmt = $this->conn
            ->createQueryBuilder()
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
        $stmt = $this->conn
            ->createQueryBuilder()
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
        $stmt = $this->conn
            ->createQueryBuilder()
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
        $stmt = $this->conn
            ->createQueryBuilder()
            ->update('meetings')
            ->where('id = :meeting_id')
            ->setParameter('meeting_id', $meeting->id);

        $stmt->set('starts_at', $stmt->createNamedParameter($meeting->startsAt->format('Y-m-d H:i:s')));
        $stmt->set('ends_at', $stmt->createNamedParameter($meeting->endsAt->format('Y-m-d H:i:s')));
        $stmt->set('status', $stmt->createNamedParameter($meeting->status));

        if ($meeting->room !== null) {
            $stmt->set('room_id', $stmt->createNamedParameter($meeting->room->id));
        }

        $result = $stmt->execute();

        if (is_int($result)) {
            return $result > 0;
        }

        return false;
    }

    public function meetingRoomByMeeting(Meeting $meeting): MeetingRoom
    {
        if ($meeting->room !== null) {
            return $meeting->room;
        }

        if (!isset($meeting->room_id)) {
            throw new RuntimeException('Can not figure out meeting room');
        }

        $stmt = $this->conn
            ->createQueryBuilder()
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

    /**
     * @param DateTimeInterface $from
     * @param DateTimeInterface $to
     *
     * @return Meeting[]
     */
    public function meetings(DateTimeInterface $from, DateTimeInterface $to): array
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->select('*')
            ->from('meetings')
            ->where('starts_at between ? and ?')
            ->setParameters([$from->format('Y-m-d H:i:s'), $to->format('Y-m-d H:i:s')])
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Meeting::class);
        return $stmt->fetchAll();
    }

    public function insertServiceRequest(Request $serviceRequest): bool
    {
        $data = [
            'id' => $serviceRequest->id,
            'service_id' => $serviceRequest->service->id,
            'room_id' => $serviceRequest->room->id,
            'host_id' => $serviceRequest->host->id,
            'total' => $serviceRequest->total,
            'done' => "false",
        ];

        return $this->insert('service_requests', $data);
    }

    public function serviceById(string $id): Service
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('services')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Service::class);
        $result = $stmt->fetch();

        if ($result === false) {
            throw new UserError("Service $id does not exists");
        }

        return $result;
    }

    private function insert(string $tableName, array $data): bool
    {
        $stmt = $this->conn
            ->createQueryBuilder()
            ->insert($tableName)
            ->values(array_fill_keys(array_keys($data), '?'))
            ->setParameters(array_values($data));

        $result = $stmt->execute();

        return is_int($result) ? $result > 0 : false;
    }

    /**
     * @param Request $request
     * @return Order[]
     */
    public function serviceOrdersByRequest(Request $request): array
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('service_orders')
            ->where('request_id = ?')
            ->setParameter(0, $request->id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Order::class);

        return $stmt->fetchAll();
    }

    public function serviceByOrder(Order $order): Service
    {
        if (!isset($order->service_id)) {
            throw new UserError('Can not relate service on order');
        }

        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('services')
            ->where('id = ?')
            ->setParameter(0, $order->service_id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Service::class);
        $result = $stmt->fetch();

        if ($result === false) {
            throw new UserError('Could not find service on order');
        }

        return $result;
    }

    public function meetingByServiceOrder(Order $order): Meeting
    {
        if (!isset($order->meeting_id)) {
            throw new UserError('Can not relate meeting on service order');
        }

        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('meetings')
            ->where('id = ?')
            ->setParameter(0, $order->meeting_id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Meeting::class);

        $result = $stmt->fetch();

        if ($result === false) {
            throw new UserError('Could not relate meeting in service order');
        }

        return $result;
    }

    public function insertServiceOrder(Order $order)
    {
        $data = [
            'id' => $order->id,
            'user_id' => $order->user->id,
            'meeting_id' => $order->meeting->id,
            'fulfilled' => $order->fulfilled ? 'true' : 'false', // Why PgSQL needs booleans to be strings?
        ];

        return $this->insert('service_orders', $data);
    }

    /**
     * @param Request[] $requests
     */
    public function insertServiceRequests(array $requests)
    {
        foreach ($requests as $request) {
            $data = [
                'id' => $request->id,
                'order_id' => $request->order->id,
                'service_id' => $request->service->id,
                'total' => $request->total,
            ];

            $this->insert('service_requests', $data);
        }
    }

    /**
     * @param Order $order
     * @return Request[]
     */
    public function serviceRequestsByOrder(Order $order): array
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('service_requests')
            ->where('order_id = ?')
            ->setParameter(0, $order->id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Request::class);

        return $stmt->fetchAll();
    }

    public function orderById(string $id): Order
    {
        $stmt = $this->conn->createQueryBuilder()
            ->select('*')
            ->from('service_orders')
            ->where('id = ?')
            ->setParameter(0, $id)
            ->execute();

        $stmt->setFetchMode(FetchMode::CUSTOM_OBJECT, Order::class);

        return $stmt->fetch();
    }
}
