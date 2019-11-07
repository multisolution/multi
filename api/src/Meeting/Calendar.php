<?php declare(strict_types=1);

namespace Multi\Meeting;

use DateTimeImmutable;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class Calendar implements Resolver
{
    const DEFAULT_INTERVAL = '+1 week';

    public function __invoke($root, array $args, Context $context)
    {
        $now = new DateTimeImmutable();
        $from = array_get($args, 'from', $now);
        $to = array_get($args, 'to', $now->modify(self::DEFAULT_INTERVAL));

        $meetings = $context->db->meetings($from, $to);

        $groupedMeetings = array_reduce($meetings, function (array $groups, Meeting $meeting): array {
            $date = $meeting->startsAt->format('Y-m-d\TH:00:00.000\Z');

            if (empty($groups[$date])) {
                $groups[$date] = [
                    'date' => $date,
                    'meetings' => [],
                ];
            }

            $groups[$date]['meetings'][] = $meeting;

            return $groups;
        }, []);

        return $groupedMeetings;
    }
}
