<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShippingDetail;
use App\Http\Resources\ShippingResource;


class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shipping = ShippingDetail::all();
        return ShippingResource::collection($shipping);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $shipping = new ShippingDetail;

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'street' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'apartment_number' => 'nullable|string|max:20',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'other_instructions' => 'nullable|string|max:300',
        ]);

        $shipping->user_id = $request->input('user_id');
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
        $shipping = ShippingDetail::find($id);
        if (!$shipping) {
            return response()->json(['message' => 'Shipping detail not found'], 404);
        }
        return new ShippingResource($shipping);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'street' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'apartment_number' => 'nullable|string|max:20',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'other_instructions' => 'nullable|string|max:300',
        ]);

        $shipping->user_id = $request->input('user_id');
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
        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        $shipping->delete();

        return response()->json(['message' => 'Shipping deleted successfully'], 200);
    }
}
