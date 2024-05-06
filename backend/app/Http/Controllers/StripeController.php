<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StripeRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
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
        $validData = $request->validated();
        $user = Auth::user();
        $items = $validData['cartItems'];
        $lineItems = $this->prepareLineItems($items);
        $successUrl = $validData['success_url'] . '?session_id={CHECKOUT_SESSION_ID}';
        $cancelUrl = $validData['cancel_url'] . '?session_id={CHECKOUT_SESSION_ID}';
        $customFields = $this->prepareCustomFields($user->shippingDetails);

        $response = $this->stripeClient->checkout->sessions->create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'customer_email' => $user->email,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'custom_fields' => $customFields,
        ]);

        return response()->json(['url' => $response->url]);
    }

    public function paymentStatus(string $sessionId)
    {
        $stripeSession = $this->stripeClient->checkout->sessions->retrieve(
            $sessionId,
            ['expand' => ['line_items.data.price.product']]
        );

        if (Gate::allows('createOrder', [Order::class, $stripeSession])) {
            $lineItems = $this->convertStripeLineItems($stripeSession->line_items->data);
            $order = $this->createOrder($lineItems);

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order,
                'paymentStatus' => $stripeSession->payment_status,
                'shippingId' => $stripeSession->custom_fields[0]->dropdown->value,
            ], 200);
        }
    }

    protected function createOrder($lineItems)
    {
        $this->authorize('create', OrderDetail::class);
        $userId = Auth::user()->id;
        $order = Order::create(['user_id' => $userId, 'order_date' => Carbon::now()]);

        foreach ($lineItems as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'variant_id' => $item['variant_id'],
                'quantity' => $item['quantity'],
                'purchase_price' => $item['price'],
            ]);
        }
        return $order;
    }
}
