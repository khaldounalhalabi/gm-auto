<?php

namespace App\Services\v1\Client;

use App\Models\Client;
use App\Repositories\ClientRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<Client>
 * @property ClientRepository $repository
 */
class ClientService extends BaseService
{
    use Makable;

    protected string $repositoryClass = ClientRepository::class;
}
