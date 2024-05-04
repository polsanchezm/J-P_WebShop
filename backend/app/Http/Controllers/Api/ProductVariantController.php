<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
        // $productVariant = ProductVariant::all();
        return response()->json(ProductVariantResource::collection($productVariant->load('product')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Productvariant::class);

        $request->validate([
            'size' => 'required|string|max:2',
            'color' => 'required|string|max:45',
            'stock' => 'nullable|integer',
            'product_id' => 'required|exists:products,id'
        ]);

        $productVariant = new ProductVariant;
        $productVariant->size = $request->input('size');
        $productVariant->color = $request->input('color');
        $productVariant->stock = $request->input('stock');
        $productVariant->product_id = $request->input('product_id');

        $productVariant->save();

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
    public function update(Request $request, string $id)
    {
        $this->authorize('update', Productvariant::class);

        $productVariant = ProductVariant::find($id);

        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }

        $request->validate([
            'size' => 'required|string|max:2',
            'color' => 'required|string|max:45',
            'stock' => 'nullable|integer',
            'product_id' => 'required|exists:products,id'
        ]);

        $productVariant->size = $request->input('size');
        $productVariant->color = $request->input('color');
        $productVariant->stock = $request->input('stock');
        $productVariant->product_id = $request->input('product_id');

        $productVariant->update();

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
        $this->authorize('delete', Productvariant::class);

        $productVariant = ProductVariant::find($id);

        if (!$productVariant) {
            return response()->json(['message' => 'ProductVariant not found'], 404);
        }

        $productVariant->delete();

        return response()->json(['message' => 'ProductVariant deleted successfully'], 200);
    }
}
