<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShippingRequest;
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
    public function store(ShippingRequest $request)
    {
        $request->validated();

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

        // TODO: implementar esto y eliminar lo de arriba
        // $input = $request->all();
        // $userId = Auth::user()->id;
        // $shipping = ShippingDetail::create([
        //     'user_id' => $userId,
        //     'phone' => $input['phone'],
        //     'street' => $input['street'],
        //     'unit' => $input['unit'],
        //     'apartment_number' => $input['apartment_number'],
        //     'country' => $input['country'],
        //     'city' => $input['city'],
        //     'other_instructions' => $input['other_instructions']
        // ]);

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

        return response()->json(new ShippingResource($shipping));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ShippingRequest $request, string $id)
    {
        $shipping = ShippingDetail::find($id);

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        $request->validated();

        $shipping->user_id = Auth::user()->id;
        $shipping->phone = $request->input('phone');
        $shipping->street = $request->input('street');
        $shipping->unit = $request->input('unit');
        $shipping->apartment_number = $request->input('apartment_number');
        $shipping->country = $request->input('country');
        $shipping->city = $request->input('city');
        $shipping->other_instructions = $request->input('other_instructions');
        $shipping->update();

        // TODO: implementar esto y eliminar lo de arriba
        // $validData = $request->validated();
        // $shipping->update($validData);

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
