<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'price' => $this->price,
            'categoryId' => $this->category_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'productVariants' => new ProductVariantCollection($this->productVariant),
        ];
    }
}
