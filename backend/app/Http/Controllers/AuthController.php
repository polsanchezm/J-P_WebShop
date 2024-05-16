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
    public function register(RegisterRequest $request)
    {
        // Creació de l'usuari
        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'birthdate' => $request->birthdate,
            'role' => 'client',
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Logueja l'usuari
        Auth::login($user);

        // Generar token per a la sessió de l'usuari
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

        // Creació de la wishlist de l'usuari
        $userId = Auth::user()->id;
        $whislist = Wishlist::create(['user_id' => $userId]);

        return response()->json([
            'message' => 'User registered and logged in successfully',
            'user' => $user,
            'token' => $token,
            'userWishlist' => $whislist,
        ], 201);

    }

    
    public function login(LoginRequest $request)
    {

        // Troba l'usuari mitjançant l'email
        $user = User::where('email', $request->email)->first();
        if (!empty($user)) {
            // Comprova que les dades d'accés siguien vàlides
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

    
    // Mètode per a tancar la sessió de l'usuari
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'User logged out',
        ], 200);
    }
}
