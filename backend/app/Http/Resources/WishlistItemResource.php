<?php

namespace App\Http\Resources;

use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WishlistItemResource extends JsonResource
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
            'wishlistId' => $this->wishlist_id,
            'variantId' => $this->variant_id,
            'quantity' => $this->quantity,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'product' => new ProductResource(ProductVariant::find($this->variant_id)->product),
        ];
    }
}
