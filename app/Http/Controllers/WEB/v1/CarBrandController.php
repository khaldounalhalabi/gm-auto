<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\CarBrand\StoreUpdateCarBrandRequest;
use App\Http\Resources\v1\CarBrandResource;
use App\Models\CarBrand;
use App\Services\v1\CarBrand\CarBrandService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarBrandController extends WebController
{
    private CarBrandService $carBrandService;

    public function __construct()
    {
        $this->carBrandService = CarBrandService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function data()
    {
        $items = $this->carBrandService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = CarBrand::getModel()->exportable();

        return Inertia::render('dashboard/car-brands/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($carBrandId)
    {
        $carBrand = $this->carBrandService->view($carBrandId, $this->relations);

        return Inertia::render('dashboard/car-brands/show', [
            'carBrand' => CarBrandResource::make($carBrand),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/car-brands/create');
    }

    public function store(StoreUpdateCarBrandRequest $request)
    {
        $carBrand = $this->carBrandService->store($request->validated(), $this->relations);
        if ($carBrand) {
            return redirect()
                ->route('v1.web.protected.car.brands.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($carBrandId)
    {
        $carBrand = $this->carBrandService->view($carBrandId, $this->relations);

        if (!$carBrand) {
            abort(404);
        }

        return Inertia::render('dashboard/car-brands/edit', [
            'carBrand' => CarBrandResource::make($carBrand),
        ]);
    }

    public function update(StoreUpdateCarBrandRequest $request, $carBrandId)
    {
        $carBrand = $this->carBrandService->update($request->validated(), $carBrandId, $this->relations);
        if ($carBrand) {
            return redirect()
                ->route('v1.web.protected.car.brands.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($carBrandId)
    {
        $result = $this->carBrandService->delete($carBrandId);

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
            $result = $this->carBrandService->export($ids);
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
            $result = $this->carBrandService->getImportExample();
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
            $this->carBrandService->import();

            return redirect()
                ->back()
                ->with('message', trans('site.success'));
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('message', trans('site.something_went_wrong'));
        }
    }
}
