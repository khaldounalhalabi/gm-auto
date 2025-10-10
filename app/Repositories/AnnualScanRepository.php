<?php

namespace App\Repositories;

use App\Models\AnnualScan;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<AnnualScan>
 */
class AnnualScanRepository extends BaseRepository
{
    protected string $modelClass = AnnualScan::class;
}
