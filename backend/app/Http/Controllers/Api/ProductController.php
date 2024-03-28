<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        // $products = Product::orderBy("id", "desc")->get();

        // return new ProductResource($products);
        $products = Product::all();
        return ProductResource::collection($products);

    }
}
