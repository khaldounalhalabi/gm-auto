<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\AnnualScan;
use Illuminate\Http\Request;

/** @mixin AnnualScan */
class AnnualScanResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_id' => $this->client_id,
            'car_id' => $this->car_id,
            'scan_date' => $this->scan_date?->format('Y-m-d'),
            'expiry_date' => $this->expiry_date?->format('Y-m-d'),
            'is_passed' => $this->is_passed,
            'cost' => $this->cost,
            'test_report' => $this->test_report,
            'notes' => $this->notes,
            'client' => ClientResource::make($this->whenLoaded('client')),
            'car' => CarResource::make($this->whenLoaded('car')),
        ];
    }
}
