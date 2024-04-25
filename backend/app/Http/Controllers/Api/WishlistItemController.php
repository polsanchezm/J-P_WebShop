<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WishlistItem;
use App\Models\Wishlist;
use App\Models\ProductVariant;
use App\Http\Resources\WishlistItemResource;
use Illuminate\Support\Facades\Auth;

class WishlistItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $wishlist = Wishlist::where('user_id', $userId)->first();
        
        $wishlistItems = WishlistItem::where('wishlist_id', $wishlist->id)->get();
        if (!$wishlistItems) {
            return response()->json(['message' => 'Wishlist details not found'], 404);
        }
        return response()->json(WishlistItemResource::collection($wishlistItems));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            // 'wishlist_id' => 'required|exists:wishlists,id',
            'variant_id' => 'required|exists:product_variants,id',
            // 'quantity' => 'required|numeric|min:1'
        ]);

        $userId = Auth::user()->id;
        $wishlist = Wishlist::where('user_id', $userId)->first();

        // $wishlist = Wishlist::find($request->wishlist_id);

        if (!$wishlist) {
            return response()->json(['message' => 'Wishlist not found'], 404);
        }

        $productVariant = ProductVariant::find($request->variant_id);

        if (!$productVariant) {
            return response()->json(['message' => 'Product variant not found'], 404);
        }

        $existingItem = WishlistItem::where('wishlist_id', $wishlist->id)
                                 ->where('variant_id', $productVariant->id)
                                 ->first();

        if ($existingItem) {
            return response()->json(['message' => 'El producte ja existeix en la wishlist, no es pot afegir una altra vegada'], 409); // Código de estado HTTP 409 Conflict
        }

        $wishlistItem = new WishlistItem;
        $wishlistItem->wishlist_id = $wishlist->id;
        $wishlistItem->variant_id = $productVariant->id;
        // $wishlistItem->quantity = $request->quantity;

        $wishlistItem->save();

        return response()->json([
            "message" => "Wishlist item stored successfully",
            'wishlistItem' => $wishlistItem
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $wishlistItem = WishlistItem::find($id);
        if (!$wishlistItem) {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }
        return response()->json(new WishlistItemResource($wishlistItem));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $wishlistItem = WishlistItem::find($id);

        if (!$wishlistItem) {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }

        $wishlistItem->delete();

        return response()->json([
            "message" => "Wishlist item removed from order successfully",
        ], 200);
    }
}
