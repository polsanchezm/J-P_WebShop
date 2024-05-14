<?php

namespace App\Http\Resources;

use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orderId' => $this->order_id,
            'quantity' => $this->quantity,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'totalPrice' => $this->order->total_price,
            'purchasePrice' => $this->purchase_price,
            'productVariant' => new ProductVariantResource(ProductVariant::find($this->variant_id)),
            'product' => new ProductResource(ProductVariant::find($this->variant_id)->product),
        ];
    }
}
