<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingRequest extends FormRequest
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
        return [
            'phone' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'apartment_number' => 'required|integer|digits_between:1,3',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'other_instructions' => 'nullable|string|max:300',
        ];
    }
}
