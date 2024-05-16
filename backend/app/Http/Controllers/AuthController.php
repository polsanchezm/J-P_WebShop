<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Wishlist;

class AuthController extends Controller
{
    // Register API (POST, formdata)
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'birthdate' => $request->birthdate,
            'role' => 'client',
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Auth::login($user);
        // Generar token para la sesión del usuario
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
        $userId = Auth::user()->id;
        $whislist = Wishlist::create(['user_id' => $userId]);
        return response()->json([
            'message' => 'User registered and logged in successfully',
            'user' => $user,
            'token' => $token,
            'userWishlist' => $whislist,
        ], 201);

    }

    // Login API (POST, formdata)
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!empty($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

                return response()->json([
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            }
            return response()->json([
                'message' => 'Password didn\'t match',
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
            'message' => 'User logged out',
        ], 200);
    }
}
