<?php

namespace App\Repositories;

use App\Models\Client;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Client>
 */
class ClientRepository extends BaseRepository
{
    protected string $modelClass = Client::class;
}
