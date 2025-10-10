<?php

namespace App\Http\Requests\v1\Part;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdatePartRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'min:3'],
            'type' => ['required', 'string', 'max:255', 'min:3'],
            'invoice_number' => ['nullable', 'string', 'max:255', 'min:3'],
            'source' => ['nullable', 'string', 'max:255', 'min:3'],
            'notes' => ['nullable', 'max:5000', 'min:0'],
        ];
    }
}
