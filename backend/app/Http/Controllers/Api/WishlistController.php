<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Http\Resources\WishlistResource;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $wishlists = Wishlist::where('user_id', $userId)->get();
        if (!$wishlists) {
            return response()->json(['message' => 'User wishlists not found'], 404);
        }
        return response()->json(WishlistResource::collection($wishlists));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // $wishlist = Wishlist::find($id);
        // if (!$wishlist) {
        //     return response()->json(['message' => 'Wishlist not found'], 404);
        // }
        // return new WishlistResource($wishlist);
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
        // $wishlist = Wishlist::find($id);

        // if (!$wishlist) {
        //     return response()->json(['message' => 'Wishlist not found'], 404);
        // }

        // $wishlist->delete();

        // return response()->json(['message' => 'Wishlist deleted successfully'], 200);
    }
}
