<?php

namespace App\Repositories;

use App\Models\Car;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Car>
 */
class CarRepository extends BaseRepository
{
    protected string $modelClass = Car::class;
}
