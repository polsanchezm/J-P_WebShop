<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function getImage($imageName)
    {
        $image = Storage::disk('images')->get($imageName);
        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return new Response($image, 200);
    }
}
