<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function initiatePayment(Request $request)
    {
        $stripe = new StripeClient(config('services.stripe.secret'));

        $items = $request->input('cartItems');
        $userEmail = Auth::user()->email;
        $userAddresses = Auth::user()->shippingDetails;

        $successUrl = $request->input('success_url') . '?session_id={CHECKOUT_SESSION_ID}';
        $cancelUrl = $request->input('cancel_url') . '?session_id={CHECKOUT_SESSION_ID}';

        $addressOptions = $userAddresses->map(function ($address) {
            return [
                'label' => strtoupper($address->street . ', ' . $address->apartment_number . '. ' . $address->city . '.'),
                'value' => $address->id
            ];
        })->toArray();

        $lineItems = array_map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['name'],
                        'metadata' => [
                            'variant_id' => $item['variant_id'],
                        ]
                    ],
                    'unit_amount' => intval($item['price'] * 100),
                ],
                'quantity' => $item['quantity'],
            ];
        }, $items);


        $response = $stripe->checkout->sessions->create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'customer_email' => $userEmail,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'custom_fields' => [
                [
                    'key' => 'address',
                    'label' => [
                        'type' => 'custom',
                        'custom' => 'Shipping address',
                    ],
                    'optional' => false,
                    'type' => 'dropdown',
                    'dropdown' => [
                        'options' => $addressOptions,
                    ],
                ],
            ],
        ]);

        return response()->json(['url' => $response->url]);
    }

    public function paymentStatus(string $sessionId)
    {
        $stripe = new StripeClient(config('services.stripe.secret'));

        $session = $stripe->checkout->sessions->retrieve(
            $sessionId,
            ['expand' => ['line_items.data.price.product']]
        );

        if ($session->payment_status === 'paid') {
            $lineItems = $this->convertStripeLineItems($session->line_items->data);
            $order = $this->createOrderAndDetails($lineItems);

            return response()->json([
                'message' => 'Order and order details created successfully',
                'order' => $order,
                'paymentStatus' => $session->payment_status,
                'shippingId' => $session->custom_fields[0]->dropdown->value,
            ], 200);
        }
        $lineItems = array_map(function ($lineItem) {
            $item = $lineItem->price->product;
            return [
                'name' => $item->name,
                'price' => $lineItem->amount_total,
                'quantity' => $lineItem->quantity,
                'currency' => $lineItem->currency,
                'variant_id' => $item->metadata['variant_id'],
            ];
        }, $session->line_items->data);
    }

    protected function convertStripeLineItems($stripeItems)
    {
        return array_map(function ($item) {
            return [
                'variant_id' => $item->price->product->metadata['variant_id'],  // Ajusta según tu configuración
                'quantity' => $item->quantity,
                'price' => $item->price->unit_amount / 100,  // Convertir a euros
            ];
        }, $stripeItems);
    }

    protected function createOrderAndDetails($lineItems)
    {
        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->order_date = Carbon::now();
        $order->save();

        foreach ($lineItems as $item) {
            $orderDetail = new OrderDetail;
            $orderDetail->order_id = $order->id;
            $orderDetail->variant_id = $item['variant_id'];
            $orderDetail->quantity = $item['quantity'];
            $orderDetail->purchase_price = $item['price'];
            $orderDetail->save();
        }
        return $order;
    }
}
