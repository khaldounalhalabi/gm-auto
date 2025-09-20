<?php

namespace App\Http\Requests\v1\AuthRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $guard = request()->acceptsHtml() ? 'web' : 'api';

        return [
            'first_name' => 'required|string|min:3|max:255',
            'last_name' => 'required|string|min:3|max:255',
            'email' => 'required|min:3|max:255|email|unique:users,email,'.auth($guard)->user()?->id,
            'password' => 'required|min:8|max:255|confirmed',
        ];
    }
}
