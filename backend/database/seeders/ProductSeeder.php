<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = base_path('database/seeders/resources/products.json');
        $imagesPath = base_path('database/seeders/productImages');
        $destinationPath = storage_path('app/public/images');
        $data = json_decode(file_get_contents($filePath), true);

        // Asegúrate de que existe la clave "products" en el JSON decodificado
        if (isset($data['products'])) {
            foreach ($data['products'] as $productData) {
                // Copiar imagen desde el almacenamiento al directorio público
                $imageFileName = $productData['image'];
                $sourceImagePath = $imagesPath . '/' . $imageFileName;
                $destinationImagePath = $destinationPath . '/' . $imageFileName;

                if (File::exists($sourceImagePath)) {
                    // Crear el directorio de destino si no existe
                    if (!File::exists($destinationPath)) {
                        File::makeDirectory($destinationPath, 0755, true);
                    }
                    // Copiar la imagen al directorio público
                    File::copy($sourceImagePath, $destinationImagePath);
                } else {
                    throw new \Exception("Image file does not exist: {$sourceImagePath}");
                }

                // Crear el producto en la base de datos
                $product = Product::create([
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'category_id' => $productData['category_id'],
                    'image' => $imageFileName, // Guardar solo el nombre del archivo de imagen
                    'price' => $productData['price'],
                ]);

                // Crear variantes de producto para cada producto creado
                $sizes = ['XS', 'S', 'M', 'L', 'XL'];
                $colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD']; // Puedes agregar más colores hexadecimales

                for ($i = 0; $i < 3; $i++) {
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'size' => $sizes[array_rand($sizes)],
                        'color' => $colors[array_rand($colors)],
                        'stock' => rand(0, 100),
                    ]);
                }
            }
        } else {
            // Manejo de errores en caso de que no exista la clave "products"
            throw new \Exception('No products found in the JSON file.');
        }
    }
}
