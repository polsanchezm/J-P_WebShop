<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    // Register API (POST, formdata)
    public function register(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "surnames" => "required|string|max:255",
            "email" => "required|string|max:255|email|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);

        User::create([
            "name" => $request->name,
            "surnames" => $request->surnames,
            "role" => "user",
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        return response()->json([
            "status" => true,
            "message" => "User registered successfully",
        ]);
    }

    // Login API (POST, formdata)
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|string|max:255|email",
            "password" => "required|string|min:8",
        ]);

        $user = User::where("email", $request->email)->first();

        if (!empty($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken("myToken")->plainTextToken;

                return response()->json([
                    "status" => true,
                    "message" => "Login successful",
                    "token" => $token,
                ]);
            }

            return response()->json([
                "status" => false,
                "message" => "Password didn't match",
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid login details',
        ]);
    }

    // Profile API (GET)
    public function profile()
    {
        $data = auth()->user();

        return response()->json([
            "status" => true,
            "message" => "Profile data",
            "user" => $data,
        ]);
    }

    // Logout API (GET)
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "status" => true,
            "message" => "User logged out ",
        ]);
    }
}
