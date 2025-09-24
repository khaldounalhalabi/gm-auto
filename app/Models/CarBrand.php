<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\CarBrandFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                          $id
 * @property string                       $name
 * @property string|null                  $image_url
 * @property Carbon                       $created_at
 * @property Carbon                       $updated_at
 * @mixin Builder<CarBrand>
 * @use  HasFactory<CarBrandFactory>
 * @property EloquentCollection<Car>|null $cars
 */
class CarBrand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_url',
    ];

    protected static function booted(): void
    {
        parent::booted();

        self::creating(function (CarBrand $carBrand) {
            $slug = str($carBrand->name)->lower()->slug();
            $carBrand->image_url = "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/$slug.png";
        });
    }

    protected function casts(): array
    {
        return [

        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'image_url',
            'car_ids',

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'image_url',

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
     * @return  HasMany<Car, static>
     */
    public function cars(): HasMany
    {
        return $this->hasMany(Car::class);
    }
}
