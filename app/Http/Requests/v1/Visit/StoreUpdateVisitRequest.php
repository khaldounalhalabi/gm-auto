<?php

namespace App\Http\Requests\v1\Visit;

use App\Enums\PartSupplierType;
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
            'cost' => 'required|numeric|min:0',
            'parts' => ['nullable', 'array', 'min:0'],
            'parts.*.name' => ['required', 'string', 'max:255', 'min:3'],
            'parts.*.type' => ['required', 'string', 'max:255', 'min:3', Rule::in(PartSupplierType::values())],
            'parts.*.quantity' => ['required', 'numeric', 'min:0'],
            'parts.*.item_price' => ['required', 'numeric', 'min:0'],
            'parts.*.invoice_number' => ['nullable', 'string', 'max:255', 'min:3'],
            'parts.*.source' => ['nullable', 'string', 'max:255', 'min:3'],
            'parts.*.notes' => ['nullable', 'max:5000', 'min:0'],
        ];
    }
}
