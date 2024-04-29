<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingResource extends JsonResource
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
            'userId' => $this->user_id,
            'phone' => $this->phone,
            'street' => $this->street,
            'unit' => $this->unit,
            'apartmentNumber' => $this->apartment_number,
            'country' => $this->country,
            'city' => $this->city,
            'otherInstructions' => $this->other_instructions,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
