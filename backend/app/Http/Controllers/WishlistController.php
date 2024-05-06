<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
        $this->authorize('viewAny', Wishlist::class);
        $userId = Auth::user()->id;
        $wishlists = Wishlist::where('user_id', $userId)->get();
        if (!$wishlists) {
            return response()->json(['message' => 'User wishlists not found'], 404);
        }
        return response()->json(WishlistResource::collection($wishlists));
    }
}
