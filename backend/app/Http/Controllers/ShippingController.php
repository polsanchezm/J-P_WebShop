<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShippingRequest;
use App\Models\ShippingDetail;
use App\Http\Resources\ShippingResource;
use Illuminate\Support\Facades\Auth;


class ShippingController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', ShippingDetail::class);
        $user = Auth::user();

        // Cerca les dades d'enviament de l'usuari loguejat, o bé totes si és rol manager
        $shipping = $user->role === 'manager' ? ShippingDetail::all() : ShippingDetail::where('user_id', $user->id)->get();
        if (!$shipping) {
            return response()->json(['message' => 'User shippings not found'], 404);
        }
        return response()->json(ShippingResource::collection($shipping));
    }


    public function store(ShippingRequest $request)
    {
        $this->authorize('create', ShippingDetail::class);

        // Validació de dades
        $validData = $request->validated();
        $userId = Auth::user()->id;

        // Crea un nou element amb les dades d'enviament
        $shipping = ShippingDetail::create([
            'user_id' => $userId,
            'phone' => $validData['phone'],
            'street' => $validData['street'],
            'unit' => $validData['unit'],
            'apartment_number' => $validData['apartment_number'],
            'country' => $validData['country'],
            'city' => $validData['city'],
            'other_instructions' => $validData['other_instructions']
        ]);

        return response()->json([
            'message' => 'Shipping stored successfully',
            'shipping' => $shipping
        ], 200);
    }


    // Retorna el detall d'un dades d'enviament específic
    public function show(string $id)
    {
        $shipping = ShippingDetail::find($id);
        $this->authorize('view', $shipping);
        if (!$shipping) {
            return response()->json(['message' => 'Shipping detail not found'], 404);
        }
        return response()->json(new ShippingResource($shipping));
    }


    public function update(ShippingRequest $request, string $id)
    {
        $shipping = ShippingDetail::find($id);
        $this->authorize('update', $shipping);
        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }

        // Validació de dades
        $validData = $request->validated();

        // Actualitza l'element
        $shipping->update($validData);

        return response()->json([
            'message' => 'Shipping updated successfully',
            'shipping' => $shipping
        ], 200);
    }


    // Elimina un dades d'enviament específic
    public function destroy(string $id)
    {
        $shipping = ShippingDetail::find($id);
        $this->authorize('delete', $shipping);
        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found'], 404);
        }
        $shipping->delete();
        return response()->json(['message' => 'Shipping deleted successfully'], 200);
    }
}
