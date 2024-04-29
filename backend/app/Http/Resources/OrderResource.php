<?php

namespace App\Http\Resources;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'orderDate' => $this->order_date,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'orderDetails' => new OrderDetailCollection($this->orderDetails),
        ];
    }
}
