<?php declare(strict_types=1);

namespace Multi;

use DateTime;
use DateTimeZone;
use GraphQL\Type\Definition\CustomScalarType;

class DateTimeScalar extends CustomScalarType
{
    /** @var string */
    const FORMAT = 'Y-m-d\TH:i:s.v\Z';

    /** @var string */
    public $name = 'DateTime';

    public function serialize($value)
    {
        return $value->format(self::FORMAT);
    }

    public function parseValue($value)
    {
        return DateTime::createFromFormat(self::FORMAT, $value, new DateTimeZone('UTC'));
    }
}
