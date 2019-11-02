<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

class Scheduled implements Status
{
    static public function scalar(): string
    {
        return 'SCHEDULED';
    }
}