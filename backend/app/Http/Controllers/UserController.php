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
    // Retorna el llistat d'usuaris
    public function index()
    {
        $this->authorize('viewAny', User::class);
        $users = User::all();
        return UserResource::collection($users);
    }

    
    // Retorna els detalls d'un usuari específic
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

        // Validació de dades
        $request->validated();

        $email = $request->input('email');
        $password = $request->input('password');

        // Verifica si l'email y la contrasenya proporcionades són correctes
        if ($user->email === $email && Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Credentials verified successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }


    public function update(UserRequest $request)
    {
        $user = Auth::user();
        $this->authorize('update', $user);

        // Validació de dades
        $validData = $request->validated();

        // Actualitza els detalls de l'usuari loguejat
        $user->update([
            'name' => $validData['name'],
            'surnames' => $validData['surnames'],
            'email' => $validData['email'],
            'password' => Hash::make($validData['password']),
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ], 200);
    }


    // Mètode que elimina el compte de l'usuari loguejat
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
