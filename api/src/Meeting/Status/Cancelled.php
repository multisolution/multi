<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

class Cancelled implements Status
{
    static public function scalar(): string
    {
        return 'CANCELLED';
    }
}
