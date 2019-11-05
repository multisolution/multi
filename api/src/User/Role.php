<?php declare(strict_types=1);

namespace Multi\User;

interface Role
{
    /**
     * @return Permission[]
     */
    public function permissions(): array;

    static function scalar(): string;
}
