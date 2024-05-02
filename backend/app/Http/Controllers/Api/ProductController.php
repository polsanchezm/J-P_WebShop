<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Helpers\ManageImage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(ProductResource::collection($products));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = new Product;

        $request->validated();


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
        return response()->json(new ProductResource($product));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validated();

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->category_id = $request->input('category_id');
        $product->price = floatval($request->input('price'));

        $imagePath = $request->file('image');
        if ($imagePath) {
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
