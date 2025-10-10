<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\Client;
use App\Models\Part;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Visit>
 */
class VisitFactory extends Factory
{
    public function definition(): array
    {
        return [
            'date' => fake()->date(),
            'car_id' => Car::factory(),
            'client_id' => Client::factory(),
            'fault_description' => fake()->text(),
            'repair_description' => fake()->text(),
            'cost' => fake()->numberBetween(0, 10000)
        ];
    }

    public function withParts(): VisitFactory
    {
        return $this->has(Part::factory());
    }
}
