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

    public function getByClient(int $clientId, array $relations = [])
    {
        return $this->globalQuery($relations)
            ->where('client_id', $clientId)
            ->paginate($this->perPage);
    }
}
