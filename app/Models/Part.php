<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\PartFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string|null $invoice_number
 * @property string|null $source
 * @property string|null $notes
 * @property numeric $quantity
 * @property numeric $item_price
 * @property int $visit_id
 * @property Visit|null $visit
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @mixin Builder<Part>
 *
 * @use  HasFactory<PartFactory>
 */
class Part extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'invoice_number',
        'source',
        'notes',
        'visit_id',
        'quantity',
        'item_price',
    ];

    protected function casts(): array
    {
        return [

        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'type',
            'invoice_number',
            'source',
            'notes',
            'quantity',
            'item_price',
            'visit_id',
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'type',
            'invoice_number',
            'source',
            'notes',
            'quantity',
            'visit_id',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [

        ];
    }
}
