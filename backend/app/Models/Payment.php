<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    private $table = "payment";

    protected $fillable = [
        "order_id",
        "total_price",
        "payment_date"
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
