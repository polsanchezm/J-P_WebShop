<?php

namespace App\Helpers;

use Illuminate\Http\Request;
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
        $image = Storage::disk('images')->get($imageName);
        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return new Response($image, 200);
    }

    public static function deleteImage($imageName)
    {
        Storage::disk('images')->delete($imageName);
    }
}