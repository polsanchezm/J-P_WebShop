<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistItem extends Model
{
    use HasFactory;
    protected $table = 'wishlist_items';
    protected $fillable = [
        'wishlist_id',
        'variant_id',
        'quantity'
    ];

    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }
}
