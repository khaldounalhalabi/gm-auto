<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;

Route::inertia('/v1/dashboard/', 'index')->name('v1.web.protected.index');

Route::get('/v1/dashboard/me', [v1\BaseAuthController::class, 'userDetails'])->name('v1.web.protected.me');
Route::put('/v1/dashboard/me', [v1\BaseAuthController::class, 'updateUserDetails'])->name('v1.web.protected.me.update');
Route::get('/v1/dashboard/logout', [v1\BaseAuthController::class, 'logout'])->name('v1.web.protected.logout');

Route::post('/v1/clients/export', [v1\ClientController::class, 'export'])->name('v1.web.protected.clients.export');
Route::post('/v1/clients/import', [v1\ClientController::class, 'import'])->name('v1.web.protected.clients.import');
Route::get('/v1/clients/get-import-example', [v1\ClientController::class, 'getImportExample'])->name('v1.web.protected.clients.import.example');
Route::get('/v1/clients/data', [v1\ClientController::class, 'data'])->name('v1.web.protected.clients.data');
Route::resource('/v1/clients', v1\ClientController::class)->names('v1.web.protected.clients');

Route::post('/v1/car-brands/export', [v1\CarBrandController::class, 'export'])->name('v1.web.protected.car.brands.export');
Route::post('/v1/car-brands/import', [v1\CarBrandController::class, 'import'])->name('v1.web.protected.car.brands.import');
Route::get('/v1/car-brands/get-import-example', [v1\CarBrandController::class, 'getImportExample'])->name('v1.web.protected.car.brands.import.example');
Route::get('/v1/car-brands/data', [v1\CarBrandController::class, 'data'])->name('v1.web.protected.car.brands.data');
Route::resource('/v1/car-brands', v1\CarBrandController::class)->names('v1.web.protected.car.brands');

Route::post('/v1/cars/export', [v1\CarController::class, 'export'])->name('v1.web.protected.cars.export');
Route::post('/v1/cars/import', [v1\CarController::class, 'import'])->name('v1.web.protected.cars.import');
Route::get('/v1/cars/get-import-example', [v1\CarController::class, 'getImportExample'])->name('v1.web.protected.cars.import.example');
Route::get('/v1/cars/data', [v1\CarController::class, 'data'])->name('v1.web.protected.cars.data');
Route::resource('/v1/cars', v1\CarController::class)->names('v1.web.protected.cars');

Route::post('/v1/visits/export', [v1\VisitController::class, 'export'])->name('v1.web.protected.visits.export');
Route::post('/v1/visits/import', [v1\VisitController::class, 'import'])->name('v1.web.protected.visits.import');
Route::get('/v1/visits/get-import-example', [v1\VisitController::class, 'getImportExample'])->name('v1.web.protected.visits.import.example');
Route::get('/v1/visits/data', [v1\VisitController::class, 'data'])->name('v1.web.protected.visits.data');
Route::resource('/v1/visits', v1\VisitController::class)->names('v1.web.protected.visits');

Route::post('/v1/annual-scans/export', [v1\AnnualScanController::class, 'export'])->name('v1.web.protected.annual.scans.export');
Route::post('/v1/annual-scans/import', [v1\AnnualScanController::class, 'import'])->name('v1.web.protected.annual.scans.import');
Route::get('/v1/annual-scans/get-import-example', [v1\AnnualScanController::class, 'getImportExample'])->name('v1.web.protected.annual.scans.import.example');
Route::get('/v1/annual-scans/data', [v1\AnnualScanController::class, 'data'])->name('v1.web.protected.annual.scans.data');
Route::resource('/v1/annual-scans', v1\AnnualScanController::class)->names('v1.web.protected.annual.scans');
