<?php

namespace App\Helpers;
use Illuminate\Http\Request;


class ManageImage {

    public static function storeImage($imagePath) {
        $path = $imagePath->store('images');
        $imageName = preg_replace("~^.*/~", "", $path);

        return $imageName;
    }

    public static function getImage($imageName) {
        $image = Storage::disk('images')->get($imageName);
        
        return new Response($image, 200);
    }

}