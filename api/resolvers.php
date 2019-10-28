<?php declare(strict_types=1);

namespace Multi;

return [
    'Query' => [
        'me' => new User\Me(),
    ],
    'Mutation' => [
        'signIn' => new User\SignIn()
    ]
];