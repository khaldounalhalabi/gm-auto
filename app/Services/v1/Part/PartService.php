<?php

namespace App\Services\v1\Part;

use App\Models\Part;
use App\Repositories\PartRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<Part>
 *
 * @property PartRepository $repository
 */
class PartService extends BaseService
{
    use Makable;

    protected string $repositoryClass = PartRepository::class;
}
