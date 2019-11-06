<?php declare(strict_types=1);

namespace Multi\Meeting\Status;

use GraphQL\Type\Definition\EnumType as EnumTypeDefinition;

class EnumType extends EnumTypeDefinition
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'MeetingStatus',
        ]);
    }

    /**
     * @param string $value
     * @return Status
     */
    public function parseValue($value)
    {
        return (new Parse())($value);
    }

    /**
     * @param Status $value
     * @return string
     */
    public function serialize($value)
    {
        return $value->__toString();
    }
}
