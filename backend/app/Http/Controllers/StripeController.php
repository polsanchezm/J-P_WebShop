<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StripeRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Stripe\StripeClient;

class StripeController extends Controller
{
    protected $stripeClient;

    function __construct()
    {
        $this->stripeClient = new StripeClient(config('services.stripe.secret'));
    }

    protected function prepareLineItems(array $items)
    {
        return array_map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['name'],
                        'metadata' => ['variant_id' => $item['variant_id']],
                    ],
                    'unit_amount' => intval($item['price'] * 100),
                ],
                'quantity' => $item['quantity'],
            ];
        }, $items);
    }

    protected function prepareCustomFields($shippingDetails)
    {
        $options = $shippingDetails->map(function ($address) {
            return [
                'label' => strtoupper($address->street . ', ' . $address->apartment_number . '. ' . $address->city . '.'),
                'value' => $address->id
            ];
        });

        return [
            [
                'key' => 'address',
                'label' => [
                    'type' => 'custom',
                    'custom' => 'Shipping address',
                ],
                'optional' => false,
                'type' => 'dropdown',
                'dropdown' => [
                    'options' => $options->toArray(),
                ],
            ],
        ];
    }

    protected function convertStripeLineItems($stripeItems)
    {
        return array_map(function ($item) {
            return [
                'variant_id' => $item->price->product->metadata['variant_id'],
                'quantity' => $item->quantity,
                'price' => $item->price->unit_amount / 100,
            ];
        }, $stripeItems);
    }

    public function initiatePayment(StripeRequest $request)
    {
        $user = Auth::user();
        $items = $request->cartItems;
        $lineItems = $this->prepareLineItems($items);
        $successUrl = $request->success_url;
        $cancelUrl = $request->cancel_url;
        $customFields = $this->prepareCustomFields($user->shippingDetails);

        $session = $this->stripeClient->checkout->sessions->create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'customer_email' => $user->email,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'custom_fields' => $customFields,
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'display_name' => 'Ground shipping',
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 399,
                            'currency' => 'eur',
                        ],
                    ]
                ],
            ],
        ]);

        // Set the cookie with the correct path and possibly domain
        $encryptedSessionId = Crypt::encryptString($session->id);
        $sessionIdCookie = cookie('session_id', $encryptedSessionId, 1, '/', null, false, true);
        return response()->json(['url' => $session->url])->withCookie($sessionIdCookie);
    }

    public function paymentStatus(Request $request)
    {
        $encryptedSessionId = $request->cookie('session_id');
        if (empty($encryptedSessionId)) {
            return response()->json(['error' => 'Session data is missing'], 400);
        }

        $sessionId = Crypt::decryptString($encryptedSessionId);

        $stripeSession = $this->stripeClient->checkout->sessions->retrieve(
            $sessionId,
            ['expand' => ['line_items.data.price.product']]
        );

        $lineItems = $this->convertStripeLineItems($stripeSession->line_items->data);
        $totalPrice = $stripeSession->amount_total * 0.01;
        $shippingId = $stripeSession->custom_fields[0]->dropdown->value;
        $result = $this->createOrder($lineItems, $sessionId, $totalPrice, $shippingId);

        return response()->json([
            'message' => $result['message'],
            'order' => $result['order'],
            'paymentStatus' => $stripeSession->payment_status,
        ], $result['status']);

    }

    protected function createOrder($lineItems, $sessionId, $totalPrice, $shippingId)
    {
        if (!$sessionId) {
            return [
                'message' => 'Invalid Stripe session ID.',
                'status' => 400,
            ];
        }

        $existingOrder = Order::where('stripe_session_id', $sessionId)->first() ? true : false;
        if ($existingOrder) {
            return [
                'message' => 'An order with this Stripe session ID already exists.',
                'order' => $existingOrder,
                'status' => 409,
            ];
        }

        $userId = Auth::user()->id;
        $order = Order::create(['user_id' => $userId, 'stripe_session_id' => $sessionId, 'shipping_id' => $shippingId, 'total_price' => $totalPrice]);
        $this->authorize('createOrder', $order);

        foreach ($lineItems as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'variant_id' => $item['variant_id'],
                'quantity' => $item['quantity'],
                'purchase_price' => $item['price'],
            ]);
        }

        return [
            'message' => 'Order created successfully.',
            'order' => $order,
            'status' => 200,
        ];
    }
}
