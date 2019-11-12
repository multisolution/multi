<?php declare(strict_types=1);

namespace Multi;

class InMemoryMessages implements Messages
{
    /** @var array */
    private $messages;

    public function __construct()
    {
        $this->messages = [
            'room_number_already_exists' => 'This room number already exists.',
            'unauthenticated' => 'There is no token on the request or the token is invalid.',
            'unauthorized' => 'You don\'t have permission for this operation.',
            'invalid_email' => 'Invalid email.',
            'meeting_conflicts' => 'There is already a meeting at this room and time',
        ];
    }

    public function get(string $key): string
    {
        return $this->messages[$key] ?? $key;
    }
}
