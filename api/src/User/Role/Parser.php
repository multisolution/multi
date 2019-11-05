<?php declare(strict_types=1);

namespace Multi\User\Role;

use DomainException;

class Parser
{
    public function __invoke(string $scalar)
    {
        switch (true) {
            case $scalar === Administrator::scalar():
                return new Administrator();

            case $scalar === Collaborator::scalar():
                return new Collaborator();
        }

        throw new DomainException("Invalid role $scalar");
    }
}
