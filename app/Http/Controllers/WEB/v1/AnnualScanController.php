<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\AnnualScan\StoreUpdateAnnualScanRequest;
use App\Http\Resources\v1\AnnualScanResource;
use App\Models\AnnualScan;
use App\Services\v1\AnnualScan\AnnualScanService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnualScanController extends WebController
{
    private AnnualScanService $annualScanService;

    public function __construct()
    {
        $this->annualScanService = AnnualScanService::make();
        // place the relations you want to return them within the response
        $this->relations = ['client', 'car'];
    }

    public function data()
    {
        $items = $this->annualScanService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = AnnualScan::getModel()->exportable();

        return Inertia::render('dashboard/annual-scans/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($annualScanId)
    {
        $annualScan = $this->annualScanService->view($annualScanId, $this->relations);

        return Inertia::render('dashboard/annual-scans/show', [
            'annualScan' => AnnualScanResource::make($annualScan),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/annual-scans/create');
    }

    public function store(StoreUpdateAnnualScanRequest $request)
    {
        $annualScan = $this->annualScanService->store($request->validated(), $this->relations);
        if ($annualScan) {
            return redirect()
                ->route('v1.web.protected.annual.scans.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($annualScanId)
    {
        $annualScan = $this->annualScanService->view($annualScanId, $this->relations);

        if (!$annualScan) {
            abort(404);
        }

        return Inertia::render('dashboard/annual-scans/edit', [
            'annualScan' => AnnualScanResource::make($annualScan),
        ]);
    }

    public function update(StoreUpdateAnnualScanRequest $request, $annualScanId)
    {
        $annualScan = $this->annualScanService->update($request->validated(), $annualScanId, $this->relations);
        if ($annualScan) {
            return redirect()
                ->route('v1.web.protected.annual.scans.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($annualScanId)
    {
        $result = $this->annualScanService->delete($annualScanId);

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
            $result = $this->annualScanService->export($ids);
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
            $result = $this->annualScanService->getImportExample();
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
            $this->annualScanService->import();

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
            ->data($this->annualScanService->getByClient($clientId, $this->relations))
            ->ok()
            ->getSuccess();
    }

    public function getByCar($carId)
    {
        return rest()
            ->data($this->annualScanService->getByCar($carId, $this->relations))
            ->ok()
            ->getSuccess();
    }
}
