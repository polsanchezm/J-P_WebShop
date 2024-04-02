<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ManageImageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Carregar el helper
        require_once app_path() . '/Helpers/ManageImage.php';
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
