<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $minimumBirthdate = Carbon::now()->subYears(14)->format('Y-m-d');

        $user = Auth::user();
        $id = $user->id;

        $request->validate([
            "name" => "required|string|max:255",
            "surnames" => "required|string|max:255",
            "birthdate" => "required|date|before:" . $minimumBirthdate,
            "email" => "required|string|max:255|email:rfc,dns|unique:users,email," . $id,
            "password" => "required|string|min:8|confirmed",
        ]);

        $user->name = $request->input('name');
        $user->surnames = $request->input('surnames');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->birthdate = $request->input('birthdate');

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
