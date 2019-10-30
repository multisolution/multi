<?php declare(strict_types=1);

namespace Multi\Test\User;

use Multi\Context;
use Multi\User\Me;
use Multi\User\User;
use PHPUnit\Framework\TestCase;

class MeTest extends TestCase
{
    public function testMe()
    {
        $context = new Context();
        $context->user = new User();

        $me = new Me();

        $this->assertSame($context->user, $me([], [], $context));
    }
}
