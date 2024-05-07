<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Helpers\ManageImage;

class ProductController extends Controller
{
    // Mètode que retorna tots els productes disponibles
    public function index()
    {
        $this->authorize('viewAny', Product::class);

        $products = Product::all();
        return response()->json(ProductResource::collection($products));
    }


    public function store(ProductRequest $request)
    {
        $this->authorize('create', Product::class);

        // Validació de dades
        $validData = $request->validated();
        $imagePath = $validData['image'];

        // Fa ús del Helper ManageImage per desar la imatge a l'storage
        $image = ManageImage::storeImage($imagePath);

        // Crea el producte
        $product = Product::create([
            'name' => $validData['name'],
            'description' => $validData['description'],
            'category_id' => $validData['category_id'],
            'price' => floatval($validData['price']),
            'image' => $image,
        ]);

        return response()->json([
            'message' => 'Product stored successfully',
            'product' => $product
        ], 200);
    }


    // Mostra la informació o detalls d'un producte
    public function show(string $id)
    {
        $this->authorize('view', Product::class);
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json(new ProductResource($product));
    }


    public function update(ProductRequest $request, string $id)
    {
        $this->authorize('update', Product::class);

        // Cerca el producte
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validació de dades
        $validData = $request->validated();

        // Gestiona, si cal, el canvi d'imatge
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image');
            if ($product->image) {
                // Elimina la imatge actual de l'storage
                ManageImage::deleteImage($product->image);
            }
            // Desa la imatge nova
            $imageName = ManageImage::storeImage($imagePath);
            $validData['image'] = $imageName;
        }

        // Actualitza les dades
        $product->update($validData);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ], 200);
    }


    // Mètode que elimina un producte específic
    public function destroy(string $id)
    {
        $this->authorize('delete', Product::class);
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $imageName = $product->image;
        
        // Elimina la imatge de l'storage
        ManageImage::deleteImage($imageName);

        // Elimina el producte
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

}
