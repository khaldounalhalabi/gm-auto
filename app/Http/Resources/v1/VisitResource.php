<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Visit;
use Illuminate\Http\Request;

/** @mixin Visit */
class VisitResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date?->format('Y-m-d'),
            'car_id' => $this->car_id,
            'client_id' => $this->client_id,
            'fault_description' => $this->fault_description,
            'repair_description' => $this->repair_description,
            'total_cost' => $this->total_cost,
            'cost' => $this->cost,
            'car' => CarResource::make($this->whenLoaded('car')),
            'client' => ClientResource::make($this->whenLoaded('client')),
            'parts' => PartResource::collection($this->whenLoaded('parts')),
        ];
    }
}
