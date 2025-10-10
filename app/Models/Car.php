<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\CarFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                                 $id
 * @property string                              $model_name
 * @property int                                 $car_brand_id
 * @property int                                 $client_id
 * @property string                              $registration_plate
 * @property CarBrand|null                       $carBrand
 * @property Client|null                         $client
 * @property Carbon                              $created_at
 * @property Carbon                              $updated_at
 * @mixin Builder<Car>
 * @use  HasFactory<CarFactory>
 * @property EloquentCollection<Visit>|null      $visits
 * @property EloquentCollection<AnnualScan>|null $annualScans
 */
class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'model_name',
        'car_brand_id',
        'client_id',
        'registration_plate',

    ];

    protected function casts(): array
    {
        return [

        ];
    }

    public function exportable(): array
    {
        return [
            'model_name',
            'registration_plate',
            'carBrand.name',
            'client.full_name',
            'visit_ids',
            'mot-test_ids',

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'model_name',
            'registration_plate',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'carBrand' => [
                'name',
                'image_url',
            ],
            'client' => [
                'full_name',
                'phone',
            ],
        ];
    }

    public function filterArray(): array
    {
        return [
            [
                'name' => 'client_id',
                'query' => fn(Builder|Car $builder, $value) => $builder
                    ->when(isset($value), fn(Builder|Car $query) => $query->where('client_id', $value)),
            ],
        ];
    }

    /**
     * @return BelongsTo<CarBrand, static>
     */
    public function carBrand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class);
    }

    /**
     * @return BelongsTo<Client, static>
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * @return HasMany<Visit, static>
     */
    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    /**
     * @return  HasMany<AnnualScan, static>
     */
    public function annualScans(): HasMany
    {
        return $this->hasMany(AnnualScan::class);
    }
}
