<?php

namespace App\Http\Requests\v1\AuthRequests;

use Illuminate\Foundation\Http\FormRequest;

class CheckPasswordResetRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'reset_password_code' => 'required|string|exists:users,reset_password_code|max:8',
        ];
    }
}
