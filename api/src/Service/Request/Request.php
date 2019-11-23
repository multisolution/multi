<?php declare(strict_types=1);

namespace Multi\Service\Request;

use Multi\Service\Order\Order;
use Multi\Service\Service;

class Request
{
    /** @var string */
    public $id;
    /** @var Order */
    public $order;
    /** @var Service */
    public $service;
    /** @var int */
    public $total;
}
