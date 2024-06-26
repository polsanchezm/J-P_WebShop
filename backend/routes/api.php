<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\WishlistItemController;
use App\Http\Controllers\StripeController;
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
        Route::post('/verify-credentials', [UserController::class, 'verifyCredentials']);
        Route::get("", [UserController::class, "index"])->name("index");
        Route::get("detail", [UserController::class, "show"])->name("detail");
        Route::post("update", [UserController::class, "update"])->name("update");
        Route::delete("delete", [UserController::class, "destroy"])->name("delete");
        Route::post("logout", [AuthController::class, "logout"])->name("logout");
    });
});


Route::prefix('app')->name('app.')->group(function () {

    Route::get("search/{search}", [ProductController::class, "searchProducts"])->name("search");
    Route::get('/images/{filename}', [ImageController::class, 'getImage'])->name('images');

    Route::prefix('products')->name('products.')->group(function () {
        Route::get("/{limit?}", [ProductController::class, "index"])->name("index");
        Route::get("detail/{id}", [ProductController::class, "show"])->name("detail");

        Route::prefix('variants')->name('variants.')->group(function () {
            Route::get("/{id}", [ProductVariantController::class, "index"])->name("index");
            Route::get("detail/{id}", [ProductVariantController::class, "show"])->name("detail");
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('products')->name('products.')->group(function () {
            Route::post("create", [ProductController::class, "store"])->name("create");
            Route::post("update/{id}", [ProductController::class, "update"])->name("update");
            Route::delete("delete/{id}", [ProductController::class, "destroy"])->name("delete");

            Route::prefix('variants')->name('variants.')->group(function () {
                Route::post("create", [ProductVariantController::class, "store"])->name("create");
                Route::post("update/{id}", [ProductVariantController::class, "update"])->name("update");
                Route::delete("delete/{id}", [ProductVariantController::class, "destroy"])->name("delete");
            });
        });

        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get("", [OrderController::class, "index"])->name("index");
            Route::post("create", [OrderController::class, "store"])->name("create");
            Route::get("detail/{id}", [OrderController::class, "show"])->name("detail");
            Route::delete("delete/{id}", [OrderController::class, "destroy"])->name("delete");

            Route::prefix('details')->name('details.')->group(function () {
                Route::get("/{id}", [OrderDetailController::class, "index"])->name("index");
                Route::post("create", [OrderDetailController::class, "store"])->name("create");
                Route::get("detail/{id}", [OrderDetailController::class, "show"])->name("detail");
                Route::delete("delete/{id}", [OrderDetailController::class, "destroy"])->name("delete");
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
            Route::post('initiate', [StripeController::class, 'initiatePayment'])->name('initiate');
            Route::get('status', [StripeController::class, 'paymentStatus'])->name('status');
        });


        Route::prefix('wishlist')->name('wishlist.')->group(function () {
            Route::get("", [WishlistController::class, "index"])->name("index");

            Route::prefix('items')->name('items.')->group(function () {
                Route::get("", [WishlistItemController::class, "index"])->name("index");
                Route::post("create", [WishlistItemController::class, "store"])->name("create");
                Route::get("detail/{id}", [WishlistItemController::class, "show"])->name("detail");
                Route::delete("delete/{id}", [WishlistItemController::class, "destroy"])->name("delete");
            });
        });
    });
});
