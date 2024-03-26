<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register API (POST, formdata)
    public function register(Request $request)
    {
        $registerUserData = $request->validate([
            "name" => "required|string|max:255",
            "surnames" => "required|string|max:255",
            "email" => "required|string|max:255|email:rfc,dns|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);

        User::create([
            "name" => $registerUserData['name'],
            "surnames" => $registerUserData['surnames'],
            "role" => "user",
            "email" => $registerUserData['email'],
            "password" => Hash::make($registerUserData['password']),
        ]);

        return response()->json([
            "message" => "User registered successfully",
        ], 201);
    }

    // Login API (POST, formdata)
    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            "email" => "required|string|max:255|email:rfc,dns",
            "password" => "required|string|min:8",
        ]);

        $user = User::where('email', $loginUserData['email'])->first();

        if (!empty ($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

                return response()->json([
                    "message" => "Login successful",
                    "token" => $token,
                ], 200);
            }

            return response()->json([
                "message" => "Password didn't match",
            ], 401);
        }

        return response()->json([
            'message' => 'Invalid login details',
        ], 404);
    }

    // Logout API (GET)
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "User logged out",
        ], 200);
    }

    // Profile API (GET)
    public function profile()
    {
        $data = auth()->user();

        return response()->json([
            "message" => "Profile data",
            "user" => $data,
        ], 200);
    }
}
