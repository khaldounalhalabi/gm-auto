<?php

namespace App\Services\Contracts;

use App\Repositories\Contracts\BaseRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as RegularCollection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * @template MODEL of Model
 */
abstract class BaseService
{
    protected BaseRepository $repository;

    protected string $repositoryClass = BaseRepository::class;

    protected function __construct()
    {
        $this->repository = new $this->repositoryClass;
    }

    public function delete($id): ?bool
    {
        return $this->repository->delete($id);
    }

    /**
     * @return Collection<MODEL>|RegularCollection<MODEL>|MODEL[]
     */
    public function index(array $relations = []): Collection|array|RegularCollection
    {
        return $this->repository->all($relations);
    }

    /**
     * @return LengthAwarePaginator<int , MODEL>
     */
    public function indexWithPagination(array $relations = [], int $per_page = 10): LengthAwarePaginator
    {
        return $this->repository->allWithPagination($relations, $per_page);
    }

    public function store(array $data, array $relationships = []): Model
    {
        return $this->repository->create($data, $relationships);
    }

    public function update(array $data, $id, array $relationships = []): ?Model
    {
        return $this->repository->update($data, $id, $relationships);
    }

    public function view($id, array $relationships = []): ?Model
    {
        return $this->repository->find($id, $relationships);
    }

    /**
     * @throws Exception
     */
    public function export(array $ids = []): BinaryFileResponse
    {
        return $this->repository->export($ids);
    }

    /**
     * @throws Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function getImportExample(): BinaryFileResponse
    {
        return $this->repository->getImportExample();
    }

    public function import(): void
    {
        $this->repository->import();
    }
}
