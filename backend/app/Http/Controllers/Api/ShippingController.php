<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShippingDetail;
use App\Http\Resources\ShippingResource;
use Illuminate\Support\Facades\Auth;


class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Shipping::class);

        $userId = Auth::user()->id;
        $shipping = ShippingDetail::where('user_id', $userId)->get();
        if (!$shipping) {
            return response()->json(['message' => 'User shippings not found'], 404);
        }
        return response()->json(ShippingResource::collection($shipping));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Shipping::class);

        $request->validate([
            'phone' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'apartment_number' => 'required|integer|digits_between:1,3',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'other_instructions' => 'nullable|string|max:300',
        ]);

        $shipping = new ShippingDetail;
        $shipping->user_id = Auth::user()->id;
        $shipping->phone = $request->input('phone');
        $shipping->street = $request->input('street');
        $shipping->unit = $request->input('unit');
        $shipping->apartment_number = $request->input('apartment_number');
        $shipping->country = $request->input('country');
        $shipping->city = $request->input('city');
        $shipping->other_instructions = $request->input('other_instructions');

        $shipping->save();

        return response()->json([
            "message" => "Shipping stored successfully",
            'shipping' => $shipping
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', Shipping::class);

        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping detail not found'], 404);
        }

        return response()->json(new ShippingResource($shipping));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->authorize('update', Shipping::class);

        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        $request->validate([
            'phone' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'apartment_number' => 'required|integer|digits_between:1,3',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'other_instructions' => 'nullable|string|max:300',
        ]);

        $shipping->user_id = Auth::user()->id;
        $shipping->phone = $request->input('phone');
        $shipping->street = $request->input('street');
        $shipping->unit = $request->input('unit');
        $shipping->apartment_number = $request->input('apartment_number');
        $shipping->country = $request->input('country');
        $shipping->city = $request->input('city');
        $shipping->other_instructions = $request->input('other_instructions');

        $shipping->update();

        return response()->json([
            "message" => "Shipping updated successfully",
            'shipping' => $shipping
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete', Shipping::class);

        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        $shipping->delete();

        return response()->json(['message' => 'Shipping deleted successfully'], 200);
    }
}
