<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderDetailRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductVariant;
use App\Http\Resources\OrderDetailResource;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $this->authorize('viewAny', OrderDetail::class);

        $orderDetail = OrderDetail::where('order_id', $id)->get();
        if (!$orderDetail) {
            return response()->json(['message' => 'Order details not found'], 404);
        }
        return response()->json(OrderDetailResource::collection($orderDetail));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderDetailRequest $request)
    {
        $this->authorize('create', OrderDetail::class);

        $request->validated();

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


        // TODO: implementar esto y eliminar lo de arriba
        // $orderDetail = OrderDetail::create([
        //     'order_id' => $order->id,
        //     'variant_id' => $productVariant->id,
        //     'quantity' => $request->quantity,
        //     'purchase_price' => $request->purchase_price
        // ]);

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

        $this->authorize('view', $orderDetail);

        if (!$orderDetail) {
            return response()->json(['message' => 'Order detail not found'], 404);
        }
        return response()->json(new OrderDetailResource($orderDetail));
    }
}
