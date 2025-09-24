<?php

namespace App\Http\Requests\v1\Car;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateCarRequest extends FormRequest
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
            'model_name' => ['required', 'string', 'max:255', 'min:3'],
            'car_brand_id' => ['numeric', 'required', Rule::exists('car_brands', 'id')],
            'client_id' => ['numeric', 'required', Rule::exists('clients', 'id')],
            'registration_plate' => ['required', Rule::unique('cars', 'registration_plate')->when($this->isPut(), fn($rule) => $rule->ignore($this->route('car'))), 'string', 'max:255', 'min:3'],
        ];
    }
}
