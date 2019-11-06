<?php declare(strict_types=1);

namespace Multi\User\Role;

use GraphQL\Type\Definition\EnumType as EnumTypeDefinition;

class EnumType extends EnumTypeDefinition
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Role',
        ]);
    }

    /**
     * @param string $value
     * @return Role
     */
    public function parseValue($value)
    {
        return (new Parse())($value);
    }

    /**
     * @param Role $value
     * @return string
     */
    public function serialize($value)
    {
        return $value->__toString();
    }
}
