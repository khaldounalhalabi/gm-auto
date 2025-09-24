<?php

namespace App\Http\Requests\v1\CarBrand;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateCarBrandRequest extends FormRequest
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
            'name' => ['required', Rule::unique('car_brands', 'name')->when($this->method() == 'PUT', fn($rule) => $rule->ignore($this->route('car_brand'))), 'string', 'max:255', 'min:3'],
            'image_url' => ['nullable', 'string', 'max:255', 'min:3'],
        ];
    }
}
