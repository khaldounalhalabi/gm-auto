<?php

namespace App\Services\v1\CarBrand;

use App\Models\CarBrand;
use App\Repositories\CarBrandRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<CarBrand>
 *
 * @property CarBrandRepository $repository
 */
class CarBrandService extends BaseService
{
    use Makable;

    protected string $repositoryClass = CarBrandRepository::class;
}
