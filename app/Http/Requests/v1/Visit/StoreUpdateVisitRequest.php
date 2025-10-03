<?php

namespace App\Http\Requests\v1\Visit;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateVisitRequest extends FormRequest
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
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            'client_id' => ['numeric', 'required', Rule::exists('clients', 'id')],
            'car_id' => ['numeric', 'required', Rule::exists('cars', 'id')->where('client_id', $this->integer('client_id'))],
            'fault_description' => ['nullable', 'max:5000', 'min:0'],
            'repair_description' => ['nullable', 'max:5000', 'min:0'],
            'cost' => 'required|numeric|min:0'
        ];
    }
}
