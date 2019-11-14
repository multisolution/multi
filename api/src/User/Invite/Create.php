<?php declare(strict_types=1);

namespace Multi\User\Invite;

use Firebase\JWT\JWT;
use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use Multi\User\Permission\CreateInvite;
use Multi\User\Permission\Permits;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context): string
    {
        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }

        if (!(new Permits($context->user))(new CreateInvite())) {
            throw new UserError($context->messages->get('unauthorized'));
        }

        $data = [
            'fromUserId' => $context->user->id,
            'iat' => time(),
            'exp' => time() + (48 * 120),
        ];

        return JWT::encode($data, $context->appKey);
    }
}
