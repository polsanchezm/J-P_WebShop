<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'street',
        'unit',
        'apartment_number',
        'country',
        'city',
        'other_instructions',
        'phone',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
