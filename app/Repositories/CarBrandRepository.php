<?php

namespace App\Repositories;

use App\Models\CarBrand;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<CarBrand>
 */
class CarBrandRepository extends BaseRepository
{
    protected string $modelClass = CarBrand::class;
}
