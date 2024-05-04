<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Order::class);

        $user = Auth::user();
        $orders = $user->role === 'manager' ? Order::all() : Order::where('user_id', $user->id)->get();
        if (!$orders) {
            return response()->json(['message' => 'User orders not found'], 404);
        }
        return response()->json(OrderResource::collection($orders));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Order::class);

        $order = new Order;

        $order->user_id = Auth::user()->id;
        $order->order_date = Carbon::now();

        $order->save();

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

        $this->authorize('view', $order);

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

        $this->authorize('delete', $order);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
