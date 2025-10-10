<?php

namespace App\Services\v1\AnnualScan;

use App\Models\AnnualScan;
use App\Repositories\AnnualScanRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @extends BaseService<AnnualScan>
 * @property AnnualScanRepository $repository
 */
class AnnualScanService extends BaseService
{
    use Makable;

    protected string $repositoryClass = AnnualScanRepository::class;

    public function getByClient(int $clientId, array $relations = []): LengthAwarePaginator
    {
        return $this->repository->getByClient($clientId, $relations);
    }

    public function getByCar(int $carId, array $relations = []): LengthAwarePaginator
    {
        return $this->repository->getByCar($carId, $relations);
    }
}
