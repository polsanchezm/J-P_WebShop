<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(new UserResource($user));
    }

    public function verifyCredentials(Request $request)
    {
        $user = Auth::user();
        $id = $user->id;

        if (!$user) {
            return response()->json(['message' => 'User not logged in or not found'], 401);
        }

        $request->validate([
            "email" => "required|string|max:255|email:rfc,dns|unique:users,email," . $id,
            "password" => "required|string|min:8",
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        // Verifica si el correo electrónico y la contraseña proporcionados son correctos
        if ($user->email === $email && Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Credentials verified successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request)
    {

        $user = Auth::user();

        $request->validated();

        $user->name = $request->input('name');
        $user->surnames = $request->input('surnames');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));

        $user->update();

        return response()->json([
            "message" => "User updated successfully",
            'user' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not logged or not found'], 401);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
