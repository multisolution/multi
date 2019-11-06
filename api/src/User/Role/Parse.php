<?php declare(strict_types=1);

namespace Multi\User\Role;

class Parse
{
    public function __invoke(string $role): Role
    {
        switch ($role) {
            case Collaborator::COLLABORATOR:
                return new Collaborator();

            case Administrator::ADMINISTRATOR:
                return new Administrator();
        }
    }
}
