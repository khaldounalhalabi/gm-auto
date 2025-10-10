<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\ClientFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                                 $id
 * @property string                              $full_name
 * @property string                              $phone
 * @property Carbon                              $created_at
 * @property Carbon                              $updated_at
 * @property EloquentCollection<Car>|null        $cars
 * @property EloquentCollection<Visit>|null      $visits
 * @property EloquentCollection<AnnualScan>|null $annualScans
 * @mixin Builder<Client>
 * @use  HasFactory<ClientFactory>
 */
class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone',
    ];

    protected function casts(): array
    {
        return [

        ];
    }

    public function exportable(): array
    {
        return [
            'full_name',
            'phone',
            'car_ids',
            'visit_ids',
            'mot-test_ids',

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'full_name',
            'phone',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'cars' => [
                'model_name',
                'registration_plate',
            ],
        ];
    }

    /**
     * @return HasMany<Car, static>
     */
    public function cars(): HasMany
    {
        return $this->hasMany(Car::class);
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
