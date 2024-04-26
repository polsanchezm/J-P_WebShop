<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return $this->resource->toArray();
        return [
            'id' => $this->id,
            'totalPrice' => $this->total_price,
            'paymentDate' => $this->payment_date,
            'order' => new OrderResource($this->order),
        ];
    }
}
