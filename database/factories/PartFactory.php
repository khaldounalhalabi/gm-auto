<?php

namespace Database\Factories;

use App\Enums\PartSupplierType;
use App\Models\Part;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Part>
 */
class PartFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'type' => fake()->randomElement(PartSupplierType::values()),
            'invoice_number' => fake()->word(),
            'source' => fake()->word(),
            'notes' => fake()->text(),
            'visit_id' => Visit::factory(),
            'item_price' => fake()->numberBetween(0, 10000),
            'quantity' => fake()->numberBetween(0, 2),
        ];
    }
}
