<?php

declare(strict_types=1);

namespace Multi;

use DateTimeInterface;
use Multi\Meeting\Meeting;
use Multi\MeetingRoom\MeetingRoom;
use Multi\Service\Order;
use Multi\Service\Request\Request;
use Multi\Service\Service;
use Multi\User\User;


interface Database
{
    public function userById(string $id): ?User;

    public function userByEmail(string $email): ?User;

    public function insertUser(User $user): bool;

    public function meetingRoomById(string $id): ?MeetingRoom;

    public function insertMeetingRoom(MeetingRoom $meetingRoom): bool;

    public function insertServiceRequest(Request $serviceRequest): bool;

    /**
     * @return MeetingRoom[]
     */
    public function meetingRooms(): array;

    /**
     * @return Service[]
     */
    public function services(): array;


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
    public function orders(): array;

    public function meetingRoomByServiceRequest(Request $request): MeetingRoom;

    public function serviceByRequest(Request $request): Service;
    public function deliveryOrderById(String $orderId): bool;

    /**
     * @param DateTimeInterface $from
     * @param DateTimeInterface $to
     *
     * @return Meeting[]
     */
    public function meetings(DateTimeInterface $from, DateTimeInterface $to): array;

    public function serviceById(string $id): Service;

    /**
     * @param Request $request
     * @return Order[]
     */
    public function serviceOrdersByRequest(Request $request): array;

    public function serviceByOrder(Order $order): Service;

    public function meetingByServiceOrder(Order $order): Meeting;

    public function insertServiceOrder(Order $order);

    /**
     * @param Request[] $requests
     * @return mixed
     */
    public function insertServiceRequests(array $requests);

    /**
     * @param Order $order
     * @return Request[]
     */
    public function serviceRequestsByOrder(Order $order): array;

    public function orderById(string $id): Order;
}
