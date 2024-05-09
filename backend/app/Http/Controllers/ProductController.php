<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Helpers\ManageImage;

class ProductController extends Controller
{

    public function index()
    {
        $this->authorize('viewAny', Product::class);

        $products = Product::all();
        return response()->json(ProductResource::collection($products));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $this->authorize('create', Product::class);
        $validData = $request->validated();
        $imagePath = $request->image;
        $image = ManageImage::storeImage($imagePath);
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => floatval($request->price),
            'image' => $image,
        ]);
        return response()->json([
            'message' => 'Product stored successfully',
            'product' => $product
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', Product::class);
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
        $this->authorize('update', Product::class);
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image');
            if ($product->image) {
                ManageImage::deleteImage($product->image);
            }
            $imageName = ManageImage::storeImage($imagePath);
            $product->image = $imageName;
        }
        $product->update($request->except(['image']));

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete', Product::class);
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
