<?php

namespace App\Enums;

enum PartSupplierType: string
{
    case DEALERSHIP = 'Dealership';
    case ONLINE_STORE = 'Online Store';
    case OTHER = 'Other';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
