<?php

namespace App\Http\Requests\v1\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateClientRequest extends FormRequest
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
            'full_name' => ['required', 'string', 'max:255', 'min:3'],
            'phone' => ['required', Rule::unique('clients', 'phone')->when($this->isPut(), fn($rule) => $rule->ignore($this->route('client'))), 'string', 'max:255', 'min:3'],
        ];
    }
}
