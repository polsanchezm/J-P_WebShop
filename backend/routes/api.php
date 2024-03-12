<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\ProductController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::middleware('auth:sanctum')->get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::middleware('auth:sanctum')->get('/products', [App\Http\Controllers\Product::class, 'index'])->name('products');
// Route::middleware('auth:sanctum')->post('/login', [App\Http\Controllers\Auth\LoginController::class])->name('login');

Route::post("register", [ApiController::class, "register"])->name("register");
Route::post("login", [ApiController::class, "login"])->name("login");

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get("profile", [ApiController::class, "profile"])->name("profile");
    Route::get("logout", [ApiController::class, "logout"])->name("logout");
    Route::get("products", [ProductController::class, "index"])->name("products");
});