<?php declare(strict_types=1);

namespace Multi;

use Doctrine\DBAL\DriverManager;

return [
    'in_memory' => function (string $_): Database {
        return new InMemoryDb();
    },
    'pgsql' => function (string $uri): Database {
        $params = ['url' => $uri];
        return new DoctrineDBAL(DriverManager::getConnection($params));
    },
];
