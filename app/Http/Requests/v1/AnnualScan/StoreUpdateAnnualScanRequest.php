<?php

namespace App\Http\Requests\v1\AnnualScan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateAnnualScanRequest extends FormRequest
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
            'client_id' => ['numeric', 'required', Rule::exists('clients', 'id')],
            'car_id' => ['numeric', 'required', Rule::exists('cars', 'id')->where('client_id', $this->integer('client_id'))],
            'scan_date' => ['required', 'date', 'date_format:Y-m-d'],
            'expiry_date' => ['required', 'date', 'date_format:Y-m-d'],
            'is_passed' => ['required', 'boolean'],
            'cost' => ['required', 'numeric', 'between:-3.402823466E+38,3.402823466E+38'],
            'test_report' => ['nullable', 'max:5000', 'min:0'],
            'notes' => ['nullable', 'max:5000', 'min:0'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'expiry_date' => $this->date('scan_date')?->addYear()->format('Y-m-d'),
        ]);
    }
}
