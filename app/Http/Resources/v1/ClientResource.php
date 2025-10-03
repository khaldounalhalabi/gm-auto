<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Client;
use Illuminate\Http\Request;

/** @mixin Client */
class ClientResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'phone' => $this->phone,
            'cars' => CarResource::collection($this->whenLoaded('cars')),
            'visits' => VisitResource::collection($this->whenLoaded('visits')),
        ];
    }
}
