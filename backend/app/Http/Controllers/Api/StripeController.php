<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function initiatePayment(Request $request)
    {
        $items = $request->input('cartItems');
        $userEmail = Auth::user()->email;
        $userName = Auth::user()->name;
        $successUrl = $request->input('success_url') . '?session_id={CHECKOUT_SESSION_ID}';
        $cancelUrl = $request->input('cancel_url') . '?session_id={CHECKOUT_SESSION_ID}';
        $totalPrice = 0;
        foreach ($items as $item) {
            $totalPrice += $item['price'] * $item['quantity'];
        }
        $totalPrice = intval($totalPrice * 100);

        $stripe = new StripeClient(config('services.stripe.secret'));

        $response = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Cart total price',
                        ],
                        'unit_amount' => $totalPrice,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'customer_email' => $userEmail,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'shipping_address_collection' => [
                'allowed_countries' => ['ES'],
            ],
            'phone_number_collection' => [
                'enabled' => true
            ],
            // 'custom_fields' => [
            //     [
            //         'key' => 'shippingOther',
            //         'label' => [
            //             'type' => 'custom',
            //             'custom' => 'Other Instructions',
            //         ],
            //         'type' => 'text',
            //     ]
            // ],
        ]);

        return response()->json(['url' => $response->url]);
    }

    public function paymentSuccess($sessionId)
    {
        // $sessionId = $request->query('session_id');
        $stripe = new StripeClient(config('services.stripe.secret'));

        try {
            $session = $stripe->checkout->sessions->retrieve($sessionId);
            // Lógica adicional para manejar el éxito del pago
            return response()->json(['session' => $session]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function paymentCancel(Request $request)
    {
        $sessionId = $request->query('session_id');
        return response()->json(['message' => 'Payment cancelled', 'sessionId' => $sessionId]);
    }


}
