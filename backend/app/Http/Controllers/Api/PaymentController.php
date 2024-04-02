<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payment = Payment::all();
        return PaymentResource::collection($payment);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $orderDetails = OrderDetail::where('order_id', $orderId)->get();

        if (!$orderDetails) {
            return response()->json(['message' => 'Order details not found'], 404);
        }

        $totalPrice = 0;

        foreach ($orderDetails as $detail) {
            $totalPrice += $detail->purchase_price * $detail->quantity;
        }

        $payment = new Payment;
        $payment->order_id = $order->id;
        $payment->payment_date = Carbon::now();
        $payment->total_price = $totalPrice;

        $payment->save();

        return response()->json([
            "message" => "Payment stored successfully",
            'payment' => $payment,
            "totalPrice" => $totalPrice,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }
        return new PaymentResource($payment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $paymentId)
    {
        $payment = Payment::find($paymentId);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $orderId = $payment->order_id;

        $orderDetails = OrderDetail::where('order_id', $orderId)->get();

        if (!$orderDetails) {
            return response()->json(['message' => 'Order details not found'], 404);
        }

        $totalPrice = 0;

        foreach ($orderDetails as $detail) {
            $totalPrice += $detail->purchase_price * $detail->quantity;
        }

        $payment->payment_date = Carbon::now();
        $payment->total_price = $totalPrice;

        $payment->save();

        return response()->json([
            "message" => "Payment updated successfully",
            'payment' => $payment
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully'], 200);
    }
}
