<?php

namespace App\Services\v1\Car;

use App\Models\Car;
use App\Repositories\CarRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<Car>
 * @property CarRepository $repository
 */
class CarService extends BaseService
{
    use Makable;

    protected string $repositoryClass = CarRepository::class;

    public function getByClient(int $clientId, array $relations = [])
    {
        return $this->repository->getByClient($clientId, $relations);
    }
}
