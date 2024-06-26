<?php

namespace App\Helpers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;


class ManageImage
{

    public static function storeImage($imagePath)
    {
        // Desa la imatge a l'arrel del disc 'images'
        $path = $imagePath->store('', 'images');
        return $path;
    }

    public static function getImage($imageName)
    {
        // Generar la URL de la ruta que devuelve la imagen
        $url = route('app.images', ['filename' => $imageName]);
        return $url;
    }

    public static function deleteImage($imageName)
    {
        // Elimina una imatge del disc 'images'
        Storage::disk('images')->delete($imageName);
    }
}