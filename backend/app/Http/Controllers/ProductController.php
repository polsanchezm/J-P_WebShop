<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Helpers\ManageImage;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Mètode que retorna tots els productes disponibles
    public function index(Request $request)
    {
        $this->authorize('viewAny', Product::class);
        $page = intval($request->page);
        $limit = intval($request->limit);
        $products = Product::paginate($limit, ['*'], 'page', $page);
        return response()->json([
            'products' => ProductResource::collection($products),
            'pagination' => [
                'total' => $products->total(),
                'perPage' => $products->perPage(),
                'currentPage' => $products->currentPage(),
                'lastPage' => $products->lastPage(),
                'nextPageUrl' => $products->nextPageUrl(),
                'prevPageUrl' => $products->previousPageUrl(),
            ],
        ]);
    }


    public function store(ProductRequest $request)
    {
        $this->authorize('create', Product::class);
        // Fa ús del Helper ManageImage per desar la imatge a l'storage
        $imagePath = $request->image;
        $image = ManageImage::storeImage($imagePath);

        // Crea el producte
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => floatval($request->price),
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
        // Gestiona, si cal, el canvi d'imatge
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image');
            if ($product->image) {
                // Elimina la imatge actual de l'storage
                ManageImage::deleteImage($product->image);
            }
            // Desa la imatge nova
            $imageName = ManageImage::storeImage($imagePath);
            $product->image = $imageName;
        }
        // Actualitza les dades
        $product->update($request->except(['image']));

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

    public function searchProducts(Request $request)
    {
        $searchTerm = $request->search;

        $products = Product::where(function ($query) use ($searchTerm) {
            $query->where('name', 'LIKE', "%{$searchTerm}%")
                ->orWhereHas('productVariant', function ($q) use ($searchTerm) {
                    $q->where('color', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('size', 'LIKE', "%{$searchTerm}%");
                })
                ->orWhereHas('category', function ($q) use ($searchTerm) {
                    $q->where('type', 'LIKE', "%{$searchTerm}%");
                });
        })->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

}
