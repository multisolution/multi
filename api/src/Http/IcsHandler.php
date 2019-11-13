<?php declare(strict_types=1);

namespace Multi\Http;

use Multi\Context;
use Sabre\VObject\Component\VCalendar;
use function Siler\array_get;
use function Siler\Str\slugify;
use function Siler\Swoole\emit;
use function Siler\Swoole\response;

class IcsHandler
{
    /** @var Context */
    private $context;

    public function __construct(Context $context)
    {
        $this->context = $context;
    }

    public function __invoke(array $params): bool
    {
        /** @var string $meetingId */
        $meetingId = array_get($params, 'meeting_id');
        $meeting = $this->context->db->meetingById($meetingId);

        if ($meeting === null) {
            emit('', 404);
            return true;
        }

        $ics = new VCalendar([
            'VEVENT' => [
                'SUMMARY' => $meeting->title,
                'ORGANIZER' => "mailto:{$meeting->host->email}",
                'DTSTART' => $meeting->startsAt,
                'DTEND' => $meeting->endsAt,
            ],
        ]);

        $filename = slugify($meeting->title);

        response()->header('Content-type', 'text/calendar');
        response()->header('Content-Disposition', "attachment; filename=\"{$filename}.ics\"");
        emit($ics->serialize());

        return true;
    }
}
