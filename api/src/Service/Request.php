<?php

declare(strict_types=1);

namespace Multi\Service;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\Resolver;
use function Siler\array_get;




class Request implements Resolver
{
    public function __invoke($root, array $args, Context $context)
    {

        if ($context->user === null) {
            throw new UserError($context->messages->get('unauthenticated'));
        }


        $input = array_get($args, 'input');
        $requests = array_map(function ($input) use ($context): ServiceRequest {
            $service_request = new ServiceRequest();
            $service_request->id = $context->id->generate();
            $service_request->host_id = $context->user->id;
            $service_request->room_id =  array_get($input, 'roomId');
            $service_request->service_id =  array_get($input, 'serviceId');
            $service_request->total =  array_get($input, 'total');
            return $service_request;
        }, $input);
        array_walk($requests, [$context->db, 'requestService']);
        return $requests;
    }
}
