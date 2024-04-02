<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Helpers\ManageImage;

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
            "name" => "required|string|max:45",
            "description" => "required|string|max:255",
            "category_id" => "required|exists:categories,id",
            "image" => "required|image",
            "price" => "required|string|max:5",
        ]);


        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
        $product->price = floatval($request->input('price'));

        $imagePath = $request->file('image');
        $image = ManageImage::storeImage($imagePath);
        $product->image = $image;

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

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return new ProductResource($product);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            "name" => "required|string|max:45",
            "description" => "required|string|max:255",
            "category_id" => "required|exists:categories,id",
            "image" => "nullable|image",
            "price" => "required|string|max:5",
        ]);

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
        $product->price = floatval($request->input('price'));

        $imagePath = $request->file('image');
        if ($imagePath){
            $imageName = $product->image;
            ManageImage::deleteImage($imageName);

            $image = ManageImage::storeImage($imagePath);
            $product->image = $image;
        }

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
            return response()->json(['message' => 'Product not found'], 404);
        }

        $imageName = $product->image;
        ManageImage::deleteImage($imageName);

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }


}
