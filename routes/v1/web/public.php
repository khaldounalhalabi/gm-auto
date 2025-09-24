<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;

Route::post('/v1/dashboard/login', [v1\BaseAuthController::class, 'login'])->name('v1.web.public.login');
Route::post('/v1/dashboard/register', [v1\BaseAuthController::class, 'register'])->name('v1.web.public.register');
Route::post('/v1/dashboard/request-reset-password', [v1\BaseAuthController::class, 'requestResetPassword'])->name('v1.web.public.request.reset.password');
Route::post('/v1/dashboard/reset-password', [v1\BaseAuthController::class, 'resetPassword'])->name('v1.web.public.reset.password');
Route::post('/v1/dashboard/validate-reset-password-code', [v1\BaseAuthController::class, 'validateResetPasswordCode'])->name('v1.web.public.validate.reset.password.code');
Route::inertia('/v1/dashboard/login', 'login')->name('v1.web.public.login.page');
Route::inertia('/v1/dashboard/request-reset-password', 'forget-password')->name('v1.web.public.request.reset.password.page');
Route::inertia('/v1/dashboard/reset-password', 'reset-password')->name('v1.web.public.reset.password.page');
