<?php declare(strict_types=1);

namespace Multi;

use Multi\Event\Event;
use Multi\Event\Listener;
use Multi\Meeting;
use SendGrid;
use SendGrid\Mail\Mail;
use function Siler\Monolog\info;

class SendGridListener implements Listener
{
    /** @var SendGrid */
    private $sendGrid;
    /** @var string */
    private $from;

    public function __construct(SendGrid $sendGrid, string $from)
    {
        $this->sendGrid = $sendGrid;
        $this->from = $from;
    }

    public function listen(Event $event)
    {
        if ($event instanceof Meeting\Created) {
            $meeting = $event->payload();

            $mail = new Mail();
            $mail->setFrom($this->from);
            $mail->setSubject("Reunião: {$meeting->title}");
            $mail->addContent("text/plain", "Reunião {$meeting->id} criada com sucesso");
            $mail->addTo($meeting->host->email);

            $result = $this->sendGrid->send($mail);

            info('Mail result', [$result->statusCode(), $result->body()]);
        }
    }
}
