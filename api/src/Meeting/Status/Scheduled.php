<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

class Scheduled implements Status
{
    const SCHEDULED = 'SCHEDULED';

    public function __toString()
    {
        return self::SCHEDULED;
    }
}
