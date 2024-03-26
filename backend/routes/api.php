<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
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

Route::prefix('auth')->group(function () {
    Route::post("register", [AuthController::class, "register"])->name("register");
    Route::post("login", [AuthController::class, "login"])->name("login");
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("profile", [AuthController::class, "profile"])->name("profile");
        Route::post("update", [UserController::class, "update"])->name("updateProfile");
        Route::delete("delete", [UserController::class, "destroy"])->name("deleteProfile");
        Route::get("logout", [AuthController::class, "logout"])->name("logout");
    });
});


Route::prefix('app')->middleware("auth:sanctum")->group(function () {
    Route::get("users", [UserController::class, "index"])->name("allUsers");
    Route::get("userData/{id}", [UserController::class, "show"])->name("userData");
    Route::get("products", [ProductController::class, "index"])->name("allProducts");
});
