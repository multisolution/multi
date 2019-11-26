<?php

declare(strict_types=1);

namespace Multi\Service;

use Multi\Meeting\Meeting;
use Multi\Service\Request\Request;
use Multi\User\User;
use DateTime;

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

    public $timestamp;

    public function __construct()
    {
        if (isset($this->timestamp)) {
            if (is_string($this->timestamp)) {
                $this->timestamp = DateTime::createFromFormat('Y-m-d H:i:s +', $this->timestamp);
            }
        }
    }
}
