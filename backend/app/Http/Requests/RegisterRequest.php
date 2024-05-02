<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
        $minimumBirthdate = Carbon::now()->subYears(14)->format('Y-m-d');

        return [
            "name" => "required|string|max:255",
            "surnames" => "required|string|max:255",
            "birthdate" => "required|date|before:" . $minimumBirthdate,
            "email" => "required|string|max:255|email:rfc,dns|unique:users",
            "password" => "required|string|min:8|confirmed",
        ];
    }
}
