<?php

namespace App\Http\Controllers\AJAX\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\CarBrand\StoreUpdateCarBrandRequest;
use App\Services\v1\CarBrand\CarBrandService;

class CarBrandController extends WebController
{
    private CarBrandService $service;

    public function __construct()
    {
        $this->service = CarBrandService::make();
    }

    public function store(StoreUpdateCarBrandRequest $request)
    {
        $carBrand = $this->service->store($request->validated());

        if (!$carBrand) {
            return rest()
                ->noData();
        }

        return rest()
            ->createdSuccessfully($carBrand);
    }
}
