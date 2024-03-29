<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShippingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post("register", [AuthController::class, "register"])->name("register");
    Route::post("login", [AuthController::class, "login"])->name("login");

    Route::prefix('users')->name('users.')->middleware("auth:sanctum")->group(function () {
        Route::get("", [UserController::class, "index"])->name("index");
        Route::get("detail", [UserController::class, "show"])->name("detail");
        Route::post("update", [UserController::class, "update"])->name("update");
        Route::delete("delete", [UserController::class, "destroy"])->name("delete");
        Route::get("logout", [AuthController::class, "logout"])->name("logout");
    });
});


Route::prefix('app')->name('app.')->middleware("auth:sanctum")->group(function () {
    Route::prefix('products')->name('products.')->group(function () {
        Route::get("", [ProductController::class, "index"])->name("index");
        Route::post("create", [ProductController::class, "store"])->name("create");
        Route::get("detail/{id}", [ProductController::class, "show"])->name("detail");
        Route::post("update/{id}", [ProductController::class, "update"])->name("update");
        Route::delete("delete/{id}", [ProductController::class, "destroy"])->name("delete");
        Route::prefix('variants')->name('variants.')->group(function () {

        });
    });

    Route::prefix('orders')->name('product.')->group(function () {
        Route::prefix('details')->name('details.')->group(function () {

        });
    });


    Route::prefix('shipping')->name('shipping.')->group(function () {
        Route::get("", [ShippingController::class, "index"])->name("index");
        Route::post("create", [ShippingController::class, "store"])->name("create");
        Route::get("detail/{id}", [ShippingController::class, "show"])->name("detail");
        Route::post("update/{id}", [ShippingController::class, "update"])->name("update");
        Route::delete("delete/{id}", [ShippingController::class, "destroy"])->name("delete");
    });

    Route::prefix('payment')->name('payment.')->group(function () {

    });

});
