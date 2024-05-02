<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = Auth::user()->id;
        return [
            "name" => "nullable|string|max:255",
            "surnames" => "nullable|string|max:255",
            "email" => "nullable|string|max:255|email:rfc,dns|unique:users,email," . $userId,
            "password" => "nullable|string|min:8|confirmed",
        ];
    }
}
