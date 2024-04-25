<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Wishlist;

class AuthController extends Controller
{
    // Register API (POST, formdata)
    public function register(Request $request)
    {
        $minimumBirthdate = Carbon::now()->subYears(14)->format('Y-m-d');

        $registerUserData = $request->validate([
            "name" => "required|string|max:255",
            "surnames" => "required|string|max:255",
            "birthdate" => "required|date|before:" . $minimumBirthdate,
            "email" => "required|string|max:255|email:rfc,dns|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);

        $user = User::create([
            "name" => $registerUserData['name'],
            "surnames" => $registerUserData['surnames'],
            "birthdate" => $registerUserData['birthdate'],
            "role" => "user",
            "email" => $registerUserData['email'],
            "password" => Hash::make($registerUserData['password']),
        ]);

        Auth::login($user);

        // Generar token para la sesión del usuario
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
        $whislist = new Wishlist;
        $whislist->user_id = Auth::user()->id;
        $whislist->save();

        return response()->json([
            "message" => "User registered and logged in successfully",
            "user" => $user,
            "token" => $token,
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

        if (!empty($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

                return response()->json([
                    "message" => "Login successful",
                    "user" => $user,
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
}
