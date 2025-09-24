<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Car;
use Illuminate\Http\Request;

/** @mixin Car */
class CarResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'car_brand' => CarBrandResource::make($this->whenLoaded('carBrand')),
            'client' => ClientResource::make($this->whenLoaded('client')),
            'model_name' => $this->model_name,
            'car_brand_id' => $this->car_brand_id,
            'client_id' => $this->client_id,
            'registration_plate' => $this->registration_plate,
        ];
    }
}
