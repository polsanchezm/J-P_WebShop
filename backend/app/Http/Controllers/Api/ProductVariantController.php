<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductVariantRequest;
use App\Models\ProductVariant;
use App\Http\Resources\ProductVariantResource;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $productVariant = ProductVariant::where('product_id', $id)->get();
        if (!$productVariant) {
            return response()->json(['message' => 'Product variants not found'], 404);
        }
        // $productVariant = ProductVariant::all();
        return response()->json(ProductVariantResource::collection($productVariant->load('product')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductVariantRequest $request)
    {
        $request->validated();
        $productVariant = new ProductVariant;
        $productVariant->size = $request->input('size');
        $productVariant->color = $request->input('color');
        $productVariant->stock = $request->input('stock');
        $productVariant->product_id = $request->input('product_id');
        $productVariant->save();

        // TODO: implementar esto y eliminar lo de arriba
        // $validData = $request->validated();
        // $productVariant = ProductVariant::create($validData);

        return response()->json([
            "message" => "ProductVariant stored successfully",
            'productVariant' => $productVariant
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $productVariant = ProductVariant::find($id);

        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }

        return response()->json(new ProductVariantResource($productVariant));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductVariantRequest $request, string $id)
    {
        $productVariant = ProductVariant::find($id);

        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }

        $request->validated();

        $productVariant->size = $request->input('size');
        $productVariant->color = $request->input('color');
        $productVariant->stock = $request->input('stock');
        $productVariant->product_id = $request->input('product_id');

        $productVariant->update();

        // TODO: implementar esto y eliminar lo de arriba
        // $validData = $request->validated();
        // $productVariant->update($validData);

        return response()->json([
            "message" => "ProductVariant updated successfully",
            'productVariant' => $productVariant
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productVariant = ProductVariant::find($id);

        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }

        $productVariant->delete();

        return response()->json(['message' => 'ProductVariant deleted successfully'], 200);
    }
}
