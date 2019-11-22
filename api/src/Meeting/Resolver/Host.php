<?php declare(strict_types=1);

namespace Multi\Meeting\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\User\User;
use RuntimeException;

class Host implements Resolver
{
    /**
     * @param Meeting $root
     * @param array $args
     * @param Context $context
     *
     * @return User
     */
    public function __invoke($root, array $args, Context $context)
    {
        if ($root->host !== null) {
            return $root->host;
        }

        if (isset($root->host_id) && $root->host_id !== null) {
            $host = $context->db->userById($root->host_id);

            if ($host === null) {
                throw new RuntimeException("Host {$root->host_id} not found");
            }

            return $host;
        }

        throw new RuntimeException('Could not resolve host meeting');
    }
}
