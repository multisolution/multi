<?php declare(strict_types=1);

namespace Multi\Service\Request\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\Service\Request\Request;
use function Multi\User\assert_authenticated;
use function Siler\array_get;
use function Siler\GraphQL\publish;

class Create implements Resolver
{
    public function __invoke($root, array $args, Context $context): bool
    {
        assert_authenticated($context);

        $inputs = array_get($args, 'inputs');

        $requests = array_map(function (array $input) use ($context): Request {
            $serviceRequest = new Request();
            $serviceRequest->id = $context->id->generate();
            $serviceRequest->host = $context->user;
            $serviceRequest->room = $context->db->meetingRoomById($input['roomId']);
            $serviceRequest->service = $context->db->serviceById($input['serviceId']);
            $serviceRequest->total = $input['total'];

            return $serviceRequest;
        }, $inputs);

        array_walk($requests, [$context->db, 'insertServiceRequest']);

        publish('serviceRequested', $requests);

        return true;
    }
}
