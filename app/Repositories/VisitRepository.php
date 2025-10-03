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
}
