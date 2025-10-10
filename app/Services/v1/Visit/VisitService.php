<?php

namespace App\Services\v1\Visit;

use App\Models\Part;
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

    public function store(array $data, array $relationships = []): Visit
    {
        $visit = $this->repository->create($data, $relationships);
        if (isset($data['parts']) && count($data['parts']) > 0) {
            Part::insert(
                array_map(fn($partData) => [...$partData, 'visit_id' => $visit->id], $data['parts'])
            );
        }

        $visit->updateTotalCost();

        return $visit;
    }

    public function update(array $data, $id, array $relationships = []): ?Visit
    {
        $visit = $this->repository->update($data, $id, $relationships);

        if (!$visit) {
            return null;
        }

        if (isset($data['parts']) && count($data['parts']) > 0) {
            Part::where('visit_id', $id)->delete();
            Part::insert(
                array_map(fn($partData) => [...$partData, 'visit_id' => $id], $data['parts'])
            );
        } else {
            Part::where('visit_id', $id)->delete();
        }

        $visit->updateTotalCost();

        return $visit;
    }
}
