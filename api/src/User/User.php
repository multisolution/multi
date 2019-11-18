<?php

declare(strict_types=1);

namespace Multi\User;

use Multi\User\Role\Parse;
use Multi\User\Role\Role;

class User
{
    /** @var string */
    public $id;
    /** @var string */
    public $email;
    /** @var string */
    public $password;
    /** @var Role */
    public $role;


    public function __construct()
    {
        if (is_string($this->role)) {
            $this->role = (new Parse())($this->role);
        }
    }
}
