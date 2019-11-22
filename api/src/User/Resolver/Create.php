<?php

declare(strict_types=1);

namespace Multi\User\Resolver;

use Firebase\JWT\JWT;
use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use Multi\User\Role\Collaborator;
use Multi\User\Role\Permission\CreateUser as CreateUserPermission;
use Multi\User\User;
use function Multi\User\assert_authorized;
use function Siler\array_get;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        $input = array_get($args, 'input');
        $inviteCode = array_get($input, 'inviteCode');

        if ($inviteCode !== null) {
            $inviteToken = JWT::decode($inviteCode, $context->appKey, ['HS256']);
            $context->user = $context->user ?? $context->db->userById($inviteToken->fromUserId);
        }

        assert_authorized($context, new CreateUserPermission());

        $email = strtolower(trim(array_get($input, 'email')));
        $password = trim(array_get($input, 'password'));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new UserError($context->messages->get('invalid_email'));
        }

        $user = new User();
        $user->id = $context->id->generate();
        $user->email = $email;
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        $user->role = new Collaborator();

        $context->db->insertUser($user);

        return $user;
    }
}

