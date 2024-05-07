<?php

namespace App\Helpers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;


class ManageImage
{

    public static function storeImage($imagePath)
    {
        $path = $imagePath->store('', 'images');
        return $path;
    }

    public static function getImage($imageName)
    {
        if (!Storage::disk('images')->exists($imageName)) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        $image = Storage::disk('images')->get($imageName);
        $type = Storage::disk('images')->mimeType($imageName);
        return response($image, 200)->header('Content-Type', $type);
    }

    public static function deleteImage($imageName)
    {
        Storage::disk('images')->delete($imageName);
    }
}