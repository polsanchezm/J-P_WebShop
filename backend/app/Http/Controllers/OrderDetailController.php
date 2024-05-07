<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Http\Resources\OrderDetailResource;

class OrderDetailController extends Controller
{
    // Retorna els detalls d'una comanda específica
    public function index(string $id)
    {
        $this->authorize('viewAny', OrderDetail::class);
        $orderDetail = OrderDetail::where('order_id', $id)->get();
        if (!$orderDetail) {
            return response()->json(['message' => 'Order details not found'], 404);
        }
        return response()->json(OrderDetailResource::collection($orderDetail));
    }


    // Retorna un detall de comanda en específic
    public function show(string $id)
    {
        $orderDetail = OrderDetail::find($id);
        $this->authorize('view', $orderDetail);
        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        return response()->json(new OrderDetailResource($orderDetail));
    }
}
