<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\Car\StoreUpdateCarRequest;
use App\Http\Resources\v1\CarResource;
use App\Models\Car;
use App\Services\v1\Car\CarService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends WebController
{
    private CarService $carService;

    public function __construct()
    {
        $this->carService = CarService::make();
        // place the relations you want to return them within the response
        $this->relations = ['carBrand', 'client'];
    }

    public function data()
    {
        $items = $this->carService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = Car::getModel()->exportable();

        return Inertia::render('dashboard/cars/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($carId)
    {
        $car = $this->carService->view($carId, $this->relations);

        return Inertia::render('dashboard/cars/show', [
            'car' => CarResource::make($car),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/cars/create');
    }

    public function store(StoreUpdateCarRequest $request)
    {
        $car = $this->carService->store($request->validated(), $this->relations);
        if ($car) {
            return redirect()
                ->route('v1.web.protected.cars.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($carId)
    {
        $car = $this->carService->view($carId, $this->relations);

        if (!$car) {
            abort(404);
        }

        return Inertia::render('dashboard/cars/edit', [
            'car' => CarResource::make($car),
        ]);
    }

    public function update(StoreUpdateCarRequest $request, $carId)
    {
        $car = $this->carService->update($request->validated(), $carId, $this->relations);
        if ($car) {
            return redirect()
                ->route('v1.web.protected.cars.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($carId)
    {
        $result = $this->carService->delete($carId);

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
            $result = $this->carService->export($ids);
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
            $result = $this->carService->getImportExample();
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
            $this->carService->import();

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
            ->data($this->carService->getByClient($clientId, $this->relations))
            ->ok()
            ->getSuccess();
    }
}
