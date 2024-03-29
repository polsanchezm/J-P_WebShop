<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product;

        $request->validate([
            "name" => "required|string|max:255",
            "description" => "required|string|max:255",
            "category_id" => "required|exists:categories,id",
            "image" => "required|string|max:255",
            "price" => "required|string|max:5",
        ]);

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
        $product->image = $request->input('image');
        $product->price = floatval($request->input('price'));

        $product->save();

        return response()->json([
            "message" => "Product stored successfully",
            'product' => $product
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        return new ProductResource($product);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $request->validate([
            "name" => "required|string|max:255",
            "description" => "required|string|max:255",
            "category_id" => "required|exists:categories,id",
            "image" => "required|string|max:255",
            "price" => "required|string|max:5",
        ]);

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
        $product->image = $request->input('image');
        $product->price = floatval($request->input('price'));

        $product->update();

        return response()->json([
            "message" => "Product updated successfully",
            'product' => $product
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }


}
