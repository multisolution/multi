<?php declare(strict_types=1);

namespace Multi;

use Multi\User\User;

class Context
{
    /** @var bool */
    public $debug;
    /** @var User|null */
    public $user;
    /** @var Database */
    public $db;
    /** @var string */
    public $appKey;
    /** @var IDGenerator */
    public $id;
}
