<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\WishlistItemRequest;
use App\Http\Resources\WishlistItemCollection;
use App\Http\Resources\WishlistItemResource;
use App\Models\Product;
use App\Models\WishlistItem;
use App\Models\Wishlist;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Auth;

class WishlistItemController extends Controller
{
    // Mètode que retorna els items d'una wishlist
    public function index()
    {
        $this->authorize('viewAny', WishlistItem::class);
        $wishlist = Wishlist::where('user_id', Auth::user()->id)->first();
        if (!$wishlist) {
            return response()->json(['message' => 'Wishlist not found'], 404);
        }
        $wishlistItems = WishlistItem::where('wishlist_id', $wishlist->id)->get();
        if (!$wishlistItems) {
            return response()->json(['message' => 'Wishlist items not found'], 404);
        }
        return response()->json(new WishlistItemCollection($wishlistItems));
    }


    public function store(WishlistItemRequest $request)
    {
        $this->authorize('create', WishlistItem::class);

        // Validació de dades
        $request->validated();

        $wishlist = Wishlist::where('user_id', Auth::user()->id)->first();
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
            return response()->json(['message' => 'El producte ja existeix en la wishlist, no es pot afegir una altra vegada'], 409);
        }

        // Crea un nou wishlist item
        $wishlistItem = WishlistItem::create([
            'wishlist_id' => $wishlist->id, 
            'variant_id' => $productVariant->id
        ]);

        return response()->json([
            'message' => 'Wishlist item stored successfully',
            'wishlistItem' => $wishlistItem
        ], 200);
    }

    
    // Retorna el detall d'un wishlist item
    public function show(string $id)
    {
        $this->authorize('view', WishlistItem::class);
        $wishlistItem = WishlistItem::find($id);
        if (!$wishlistItem) {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }
        $productVariant = ProductVariant::find($wishlistItem->variant_id);
        if (!$productVariant) {
            return response()->json(['message' => 'Product variant not found'], 404);
        }
        $product = Product::find($productVariant->product_id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json(new WishlistItemResource($wishlistItem));
    }

    
    // Elimina un wishlist item específic
    public function destroy(string $id)
    {
        $wishlistItem = WishlistItem::find($id);
        $this->authorize('delete', $wishlistItem);
        if (!$wishlistItem) {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }
        $wishlistItem->delete();
        return response()->json([
            'message' => 'Wishlist item removed from order successfully',
        ], 200);
    }
}
