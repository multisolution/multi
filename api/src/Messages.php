<?php declare(strict_types=1);

namespace Multi;

interface Messages
{
    public function get(string $key): string;
}