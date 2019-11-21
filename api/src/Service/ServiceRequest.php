<?php

declare(strict_types=1);

namespace Multi\Service;


class ServiceRequest
{
    /** @var string */
    public $id;
    /** @var string */
    public $service_id;
    /** @var string */
    public $room_id;
    /** @var string */
    public $host_id;
    /** @var int */
    public $total;
    /** @var bool */
    public $done;
}
