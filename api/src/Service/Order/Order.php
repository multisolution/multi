<?php declare(strict_types=1);

namespace Multi\Service\Order;

use Multi\Meeting\Meeting;
use Multi\Service\Request\Request;
use Multi\User\User;

class Order
{
    /** @var string */
    public $id;
    /** @var User */
    public $user;
    /** @var Meeting */
    public $meeting;
    /** @var bool */
    public $fulfilled = false;
    /** @var Request[] */
    public $requests;
}
