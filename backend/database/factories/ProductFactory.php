<?php

namespace Database\Factories;

use App\Helpers\ManageImage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected static $products = [];
    protected static $initialized = false;

    public function __construct()
    {
        parent::__construct();
        if (!self::$initialized) {
            self::initializeProducts();
            self::$initialized = true;
        }
    }

    protected static function initializeProducts()
    {
        $filePath = storage_path('app/public/resources/products.json');
        if (File::exists($filePath)) {
            self::$products = json_decode(File::get($filePath), true);
        }
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productIndex = array_rand(self::$products);
        $product = self::$products[$productIndex];

        $result = [
            'name' => $product['name'],
            'description' => $product['description'],
            'category_id' => $product['category_id'],
            'image' => ManageImage::getImage($product['image']),
            'price' => $product['price'],
        ];

        // Remove the product from the array if needed
        unset(self::$products[$productIndex]);

        return $result;
    }
}
