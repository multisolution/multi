<?php declare(strict_types=1);

namespace Multi;

class InMemoryDb implements Database
{
    /** @var User[] */
    private $users;

    public function __construct()
    {
        $this->users = [];
    }

    public function userById(string $id): ?User
    {
        $results = array_filter($this->users, function (User $user) use ($id): bool {
            return $user->id === $id;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function userByEmail($email): ?User
    {
        $results = array_filter($this->users, function (User $user) use ($email): bool {
            return $user->email === $email;
        });

        if (empty($results)) {
            return null;
        }

        return $results[array_key_first($results)];
    }

    public function insertUser(User $user): string
    {
        $user->id = uniqid();
        $this->users[] = $user;
        return $user->id;
    }
}