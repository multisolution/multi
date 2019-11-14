<?php declare(strict_types=1);

namespace Multi\User\Invite;

use Firebase\JWT\JWT;
use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class Invitation implements Resolver
{
    public function __invoke($root, array $args, Context $context): Invite
    {
        $code = array_get($args, 'code');
        $token = JWT::decode($code, $context->appKey, ['HS256']);

        $from = $context->db->userById($token->fromUserId);

        if ($from === null) {
            throw new UserError($context->messages->get('no_owner_invite'));
        }

        $invite = new Invite();
        $invite->from = $from;

        return $invite;
    }
}
