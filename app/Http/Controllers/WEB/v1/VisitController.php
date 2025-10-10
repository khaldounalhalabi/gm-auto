<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\Visit\StoreUpdateVisitRequest;
use App\Http\Resources\v1\VisitResource;
use App\Models\Visit;
use App\Services\v1\Visit\VisitService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitController extends WebController
{
    private VisitService $visitService;

    public function __construct()
    {
        $this->visitService = VisitService::make();
        // place the relations you want to return them within the response
        $this->relations = ['car', 'client', 'parts'];
    }

    public function data()
    {
        $items = $this->visitService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = Visit::getModel()->exportable();

        return Inertia::render('dashboard/visits/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($visitId)
    {
        $visit = $this->visitService->view($visitId, $this->relations);

        return Inertia::render('dashboard/visits/show', [
            'visit' => VisitResource::make($visit),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/visits/create');
    }

    public function store(StoreUpdateVisitRequest $request)
    {
        $visit = $this->visitService->store($request->validated(), $this->relations);
        if ($visit) {
            return redirect()
                ->route('v1.web.protected.visits.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($visitId)
    {
        $visit = $this->visitService->view($visitId, $this->relations);

        if (!$visit) {
            abort(404);
        }

        return Inertia::render('dashboard/visits/edit', [
            'visit' => VisitResource::make($visit),
        ]);
    }

    public function update(StoreUpdateVisitRequest $request, $visitId)
    {
        $visit = $this->visitService->update($request->validated(), $visitId, $this->relations);
        if ($visit) {
            return redirect()
                ->route('v1.web.protected.visits.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($visitId)
    {
        $result = $this->visitService->delete($visitId);

        return rest()
            ->when(
                $result,
                fn($rest) => $rest->ok()->deleteSuccess(),
                fn($rest) => $rest->noData(),
            )->send();
    }

    public function export(Request $request)
    {
        $ids = $request->ids ?? [];

        try {
            $result = $this->visitService->export($ids);
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function getImportExample()
    {
        try {
            $result = $this->visitService->getImportExample();
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function import(Request $request)
    {
        try {
            $request->validate(['excel_file' => 'required|mimes:xls,xlsx']);
            $this->visitService->import();

            return redirect()
                ->back()
                ->with('message', trans('site.success'));
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('message', trans('site.something_went_wrong'));
        }
    }

    public function getByClient($clientId)
    {
        return rest()
            ->data($this->visitService->getByClient($clientId, $this->relations))
            ->ok()
            ->getSuccess();
    }

    public function getByCar($carId)
    {
        return rest()
            ->data($this->visitService->getByCar($carId, $this->relations))
            ->ok()
            ->getSuccess();
    }
}
