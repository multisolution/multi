<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

class Cancelled implements Status
{
    const CANCELLED = 'CANCELLED';

    public function __toString()
    {
        return self::CANCELLED;
    }
}
