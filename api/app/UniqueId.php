<?php declare(strict_types=1);

namespace Multi;

class UniqueId implements IDGenerator
{
    public function generate(): string
    {
        return uniqid();
    }
}