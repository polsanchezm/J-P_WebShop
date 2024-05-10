<?php

namespace App\Http\Controllers;

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
        $this->authorize('viewAny', Productvariant::class);
        $productVariant = ProductVariant::where('product_id', $id)->get();
        if (!$productVariant) {
            return response()->json(['message' => 'Product variants not found'], 404);
        }
        return response()->json(ProductVariantResource::collection($productVariant->load('product')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductVariantRequest $request)
    {
        $this->authorize('create', Productvariant::class);
        $productVariant = ProductVariant::create($request->all());
        return response()->json([
            'message' => 'ProductVariant stored successfully',
            'productVariant' => $productVariant
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', Productvariant::class);
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
        $this->authorize('update', Productvariant::class);
        $productVariant = ProductVariant::find($id);
        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }
        $productVariant->update($request->all());
        return response()->json([
            'message' => 'ProductVariant updated successfully',
            'productVariant' => $productVariant
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete', Productvariant::class);
        $productVariant = ProductVariant::find($id);
        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }
        $productVariant->delete();
        return response()->json(['message' => 'ProductVariant deleted successfully'], 200);
    }
}
