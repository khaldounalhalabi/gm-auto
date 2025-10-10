<?php

namespace App\Repositories;

use App\Models\Visit;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Visit>
 */
class VisitRepository extends BaseRepository
{
    protected string $modelClass = Visit::class;

    public function getByClient(int $clientId, array $relations = [])
    {
        return $this->globalQuery($relations)
            ->where('client_id', $clientId)
            ->paginate($this->perPage);
    }

    public function getByCar(int $carId, array $relations = [])
    {
        return $this->globalQuery($relations)
            ->where('car_id', $carId)
            ->paginate($this->perPage);
    }
}
