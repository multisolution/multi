<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

use Multi\Context;
use Multi\Meeting\Meeting;
use Multi\Resolver;

class Parser implements Resolver
{
    /**
     * @param Meeting $root
     * @param array $args
     * @param Context $context
     *
     * @return string
     */
    public function __invoke($root, array $args, Context $context)
    {
        // Poor man's pattern matching
        switch (true) {
            case $root->status instanceof Scheduled:
                return Scheduled::scalar();

            case $root->status instanceof Cancelled:
                return Cancelled::scalar();
        }
    }
}