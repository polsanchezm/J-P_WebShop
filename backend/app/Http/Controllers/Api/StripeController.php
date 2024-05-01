<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function initiatePayment(Request $request)
    {
        $items = $request->input('cartItems');
        // dd($items);
        $successUrl = $request->input('success_url');
        $cancelUrl = $request->input('cancel_url');
        $totalPrice = 0;
        foreach ($items as $item) {
            $totalPrice += $item['price'] * $item['quantity'];
        }
        $stripe = new StripeClient(config('services.stripe.secret'));

        $response = $stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => 'Total del carrito',
                        ],
                        'unit_amount' => $totalPrice * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
        ]);

        return response()->json(['url' => $response->url]);
    }
}
