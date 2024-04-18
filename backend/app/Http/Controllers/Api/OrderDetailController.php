<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use App\Http\Resources\OrderDetailResource;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $orderDetail = OrderDetail::where('order_id', $id)->get();
        if (!$orderDetail) {
            return response()->json(['message' => 'Order details not found'], 404);
        }
        return OrderDetailResource::collection($orderDetail);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'variant_id' => 'required|exists:product_variants,id',
            'quantity' => 'required|numeric|min:1',
            'purchase_price' => 'required|numeric'
        ]);


        $order = Order::find($request->order_id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $productVariant = ProductVariant::find($request->variant_id);

        if (!$productVariant) {
            return response()->json(['message' => 'Product variant not found'], 404);
        }

        $orderDetail = new OrderDetail;
        $orderDetail->order_id = $order->id;
        $orderDetail->variant_id = $productVariant->id;
        $orderDetail->quantity = $request->quantity;
        $orderDetail->purchase_price = $request->purchase_price;

        $orderDetail->save();

        return response()->json([
            "message" => "Order detail stored successfully",
            'shipping' => $orderDetail
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orderDetail = OrderDetail::find($id);
        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        return response()->json(new OrderDetailResource($orderDetail));
        // return new OrderDetailResource($orderDetail);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $orderDetail = OrderDetail::find($id);

        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }

        $orderDetail->delete();

        return response()->json([
            "message" => "Order detail removed from order successfully",
        ], 200);
    }
}
