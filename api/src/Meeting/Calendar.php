<?php

declare(strict_types=1);

namespace Multi\Meeting;

use DateInterval;
use DatePeriod;
use DateTime;
use DateTimeImmutable;
use DateTimeInterface;
use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class Calendar implements Resolver
{
    const DEFAULT_INTERVAL = '+1 week';

    public function __invoke($root, array $args, Context $context)
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        $now = new DateTimeImmutable('now');

        $from = array_get($args, 'from', $now);
        $from = new DateTimeImmutable("{$from->format('Y-m-d')} 00:00:00");

        $to = array_get($args, 'to', $now->modify(self::DEFAULT_INTERVAL));
        $to = new DateTimeImmutable("{$to->format('Y-m-d')} 23:59:59");

        $meetings = $context->db->meetings($from, $to);
        $period = new DatePeriod($from, new DateInterval('P1D'), $to);
        $calendar = [];

        /** @var DateTimeInterface $date */
        foreach ($period as $date) {
            $times = [];
            $dateKey = $date->format('Y-m-d');
            $timePeriod = new DatePeriod(new DateTime("$dateKey 00:00:00"), new DateInterval('PT15M'), new DateTime("$dateKey 23:59:59"));

            /** @var DateTimeInterface $time */
            foreach ($timePeriod as $time) {
                $times[] = [
                    'hour' => $time->format('H:i'),
                    'meetings' => array_filter($meetings, function (Meeting $meeting) use ($time): bool {
                        return (new Between($meeting))($time);
                    }),
                ];
            }

            $calendar[] = [
                'date' => $date->format('Y-m-d'),
                'times' => array_chunk($times, 4, true),
            ];
        }

        return $calendar;
    }
}
