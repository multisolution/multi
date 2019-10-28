<?php declare(strict_types=1);

namespace Multi;

class Context
{
    /** @var bool */
    public $debug;
    /** @var User */
    public $user;
    /** @var Database */
    public $db;
    /** @var string */
    public $appKey;
}
