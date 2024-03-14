<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = "categories";
    protected $fillable = [
        'type',
    ];

    public static function categories()
    {
        return self::all();
    }

    public function product()
    {
        return $this->belongsToMany(Product::class);
    }
}
