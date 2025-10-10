<?php

namespace App\Repositories;

use App\Models\AnnualScan;
use App\Repositories\Contracts\BaseRepository;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @extends  BaseRepository<AnnualScan>
 */
class AnnualScanRepository extends BaseRepository
{
    protected string $modelClass = AnnualScan::class;

    public function getByClient(int $clientId, array $relations = []): LengthAwarePaginator
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
