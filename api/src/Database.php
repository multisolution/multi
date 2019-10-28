<?php declare(strict_types=1);

namespace Multi;

interface Database
{
    public function userById(string $id): ?User;

    public function userByEmail($email): ?User;

    public function insertUser(User $user): string;
}