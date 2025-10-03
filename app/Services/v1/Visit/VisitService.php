<?php

namespace App\Services\v1\Visit;

use App\Models\Visit;
use App\Repositories\VisitRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<Visit>
 * @property VisitRepository $repository
 */
class VisitService extends BaseService
{
    use Makable;

    protected string $repositoryClass = VisitRepository::class;
}
