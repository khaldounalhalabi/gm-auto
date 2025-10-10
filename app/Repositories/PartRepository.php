<?php

namespace App\Repositories;

use App\Models\Part;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Part>
 */
class PartRepository extends BaseRepository
{
    protected string $modelClass = Part::class;
}
