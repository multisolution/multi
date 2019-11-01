<?php declare(strict_types=1);

namespace Multi\Test\Meeting;

use DateTime;
use Multi\Meeting\Between;
use Multi\Meeting\Meeting;
use PHPUnit\Framework\TestCase;

class BetweenTest extends TestCase
{
    public function testBetween()
    {
        $meeting = new Meeting();
        $meeting->startsAt = new DateTime('2019-11-01 15:00:00');
        $meeting->endsAt = new DateTime('2019-11-01 17:00:00');

        $between = new Between($meeting);

        $this->assertTrue($between(new DateTime('2019-11-01 16:00:00')));
        $this->assertFalse($between(new DateTime('2019-11-01 14:00:00')));
        $this->assertFalse($between(new DateTime('2019-11-01 18:00:00')));
        $this->assertTrue($between(new DateTime('2019-11-01 15:00:00')));
        $this->assertFalse($between(new DateTime('2019-11-01 17:00:00')));
    }
}
