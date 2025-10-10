<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Part;
use Illuminate\Http\Request;

/** @mixin Part */
class PartResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'invoice_number' => $this->invoice_number,
            'source' => $this->source,
            'notes' => $this->notes,
            'quantity' => $this->quantity,
            'visit_id' => $this->visit_id,
            'item_price' => $this->item_price,
        ];
    }
}
