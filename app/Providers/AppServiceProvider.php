<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Request::macro('isPost', function () {
            return $this->method() == "POST";
        });

        Request::macro('isPut', function () {
            return $this->method() == "PUT";
        });
    }
}
