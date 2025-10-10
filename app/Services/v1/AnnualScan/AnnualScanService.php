<?php

namespace App\Services\v1\AnnualScan;

use App\Models\AnnualScan;
use App\Repositories\AnnualScanRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<AnnualScan>
 * @property AnnualScanRepository $repository
 */
class AnnualScanService extends BaseService
{
    use Makable;

    protected string $repositoryClass = AnnualScanRepository::class;
}
