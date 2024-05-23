<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = storage_path('app/public/resources/products.json');
        $data = json_decode(file_get_contents($filePath), true);

        // Asegúrate de que existe la clave "products" en el JSON decodificado
        if (isset($data['products'])) {
            foreach ($data['products'] as $productData) {
                $product = Product::create([
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'category_id' => $productData['category_id'],
                    'image' => $productData['image'],
                    'price' => $productData['price'],
                ]);

                // Crear variantes de producto para cada producto creado
                ProductVariant::factory()->count(3)->create([
                    'product_id' => $product->id,
                ]);
            }
        } else {
            // Manejo de errores en caso de que no exista la clave "products"
            throw new \Exception('No products found in the JSON file.');
        }
    }
}
