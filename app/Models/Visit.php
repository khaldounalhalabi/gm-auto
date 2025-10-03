<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\VisitFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int         $id
 * @property Carbon      $date
 * @property int         $car_id
 * @property int         $client_id
 * @property string|null $fault_description
 * @property string|null $repair_description
 * @property Car|null    $car
 * @property Client|null $client
 * @property Carbon      $created_at
 * @property Carbon      $updated_at
 * @property float       $cost
 * @mixin Builder<Visit>
 * @use  HasFactory<VisitFactory>
 */
class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'car_id',
        'client_id',
        'fault_description',
        'repair_description',
        'cost'
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }

    public function exportable(): array
    {
        return [
            'date',
            'fault_description',
            'repair_description',
            'car.model_name',
            'client.full_name',
            'part_ids',
            'cost'
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'fault_description',
            'repair_description',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'car' => ['model_name', 'registration_plate'],
            'client' => ['full_name', 'phone'],
        ];
    }

    /**
     * @return  BelongsTo<Car, static>
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * @return  BelongsTo<Client, static>
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
