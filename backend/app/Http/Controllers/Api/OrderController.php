<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $orders = Order::where('user_id', $userId)->get();
        if (!$orders) {
            return response()->json(['message' => 'User orders not found'], 404);
        }
        return response()->json(OrderResource::collection($orders));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->order_date = Carbon::now();

        $order->save();

        // TODO: implementar esto y eliminar lo de arriba
        // $userId = Auth::user()->id;
        // $order = Order::create(['user_id' => $userId, 'order_date' => Carbon::now()]);

        return response()->json([
            "message" => "Order stored successfully",
            'order' => $order
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
