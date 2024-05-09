<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\VerifyCredentialsRequest;
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
        $this->authorize('viewAny', User::class);
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = Auth::user();
        $this->authorize('view', $user);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json(new UserResource($user));
    }

    public function verifyCredentials(VerifyCredentialsRequest $request)
    {
        $user = Auth::user();
        $this->authorize('verify', $user);
        if (!$user) {
            return response()->json(['message' => 'User not logged in or not found'], 401);
        }
        $request->validated();
        $email = $request->email;
        $password = $request->password;
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
        $this->authorize('update', $user);
        $user->update([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        $this->authorize('delete', $user);
        if (!$user) {
            return response()->json(['message' => 'User not logged or not found'], 401);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
