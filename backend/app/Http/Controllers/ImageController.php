<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function getImage($filename)
    {
        if (!Storage::disk('images')->exists($filename)) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $file = Storage::disk('images')->get($filename);
        $type = Storage::disk('images')->mimeType($filename);

        return response($file, 200)->header('Content-Type', $type);
    }
}
