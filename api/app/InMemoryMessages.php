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
        ];
    }

    public function get(string $key): string
    {
        return $this->messages[$key] ?? $key;
    }
}