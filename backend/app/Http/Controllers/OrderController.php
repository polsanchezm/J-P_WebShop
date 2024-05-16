<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Order::class);
        $user = Auth::user();
        $orders = $user->role === 'manager' ? Order::orderBy('created_at', 'desc')->get()
            : Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        if (!$orders) {
            return response()->json(['message' => 'User orders not found'], 404);
        }
        return response()->json(OrderResource::collection($orders));
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
