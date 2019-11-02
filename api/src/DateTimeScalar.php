<?php declare(strict_types=1);

namespace Multi;

use DateTime;
use GraphQL\Type\Definition\CustomScalarType;

class DateTimeScalar extends CustomScalarType
{
    /** @var string */
    private const FORMAT = 'Y-m-d H:i:s';

    /** @var string */
    public $name = 'DateTime';

    public function serialize($value)
    {
        return $value->format(self::FORMAT);
    }

    public function parseValue($value)
    {
        return DateTime::createFromFormat(self::FORMAT, $value);
    }
}