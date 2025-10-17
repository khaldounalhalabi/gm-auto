<?php

use App\Http\Controllers\AJAX\v1;
use Illuminate\Support\Facades\Route;

Route::post('/car-brands', [v1\CarBrandController::class, 'store'])->name('v1.ajax.protected.cars.brands.store');
