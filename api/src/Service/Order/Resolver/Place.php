<?php declare(strict_types=1);

namespace Multi\Service\Order\Resolver;

use Multi\Context;
use Multi\Resolver;
use Multi\Service\Order\Order;
use Multi\Service\Request\Request;
use function Multi\User\assert_authenticated;
use function Siler\array_get;
use function Siler\GraphQL\publish;

class Place implements Resolver
{
    public function __invoke($root, array $args, Context $context): Order
    {
        assert_authenticated($context);

        $input = array_get($args, 'input');

        $order = new Order();
        $order->id = $context->id->generate();
        $order->user = $context->user;
        $order->meeting = $context->db->meetingById($input['meetingId']);

        $requests = array_map(function (array $requestInput) use ($context, $order) {
            $request = new Request();
            $request->id = $context->id->generate();
            $request->order = $order;
            $request->service = $context->db->serviceById($requestInput['serviceId']);
            $request->total = $requestInput['total'];
            return $request;
        }, $input['requests']);

        $context->db->insertServiceOrder($order);
        $context->db->insertServiceRequests($requests);

        publish('serviceOrdered', $order);

        return $order;
    }
}
