<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\AnnualScanFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int         $id
 * @property int         $client_id
 * @property int         $car_id
 * @property Carbon      $scan_date
 * @property Carbon      $expiry_date
 * @property bool        $is_passed
 * @property numeric     $cost
 * @property string|null $test_report
 * @property string|null $notes
 * @property Client|null $client
 * @property Car|null    $car
 * @property Carbon      $created_at
 * @property Carbon      $updated_at
 * @method Builder isPassed()
 * @mixin Builder<AnnualScan>
 * @use  HasFactory<AnnualScanFactory>
 */
class AnnualScan extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'car_id',
        'scan_date',
        'expiry_date',
        'is_passed',
        'cost',
        'test_report',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'scan_date' => 'datetime',
            'expiry_date' => 'datetime',
            'is_passed' => 'boolean',
            'cost' => 'float',
        ];
    }

    public function exportable(): array
    {
        return [
            'scan_date',
            'expiry_date',
            'is_passed',
            'cost',
            'test_report',
            'notes',
            'client.full_name',
            'car.model_name',

        ];
    }

    public static function searchableArray(): array
    {
        return [
            'test_report',
            'notes',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'client' => ['full_name', 'phone'],
            'car' => ['model_name', 'registration_plate'],
        ];
    }

    public function scopeIsPassed(Builder $query): Builder
    {
        return $query->where('is_passed', true);
    }

    /**
     * @return  BelongsTo<Client, static>
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * @return  BelongsTo<Car, static>
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
