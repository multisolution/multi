<?php declare(strict_types=1);

namespace Multi\User\Resolver;

use Firebase\JWT\JWT;
use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;

class SignIn implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {
        
        $email = array_get($args, 'email');
        $password = array_get($args, 'password');

        if ($email === null || $password === null) {
            throw new UserError('Missing email and/or password');
        }

        $user = $context->db->userByEmail($email);

        if ($user === null || !password_verify($password, $user->password)) {
            throw new UserError('Credenciais inválidas');
        }

        
        $payload = ['userId' => $user->id];
        $token = JWT::encode($payload, $context->appKey);


        return $token;
    }
}
