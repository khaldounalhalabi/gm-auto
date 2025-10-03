<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\CarBrand;
use App\Models\Client;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Car>
 */
class CarFactory extends Factory
{
    public function definition(): array
    {
        return [
            'model_name' => fake()->word(),
            'car_brand_id' => CarBrand::inRandomOrder()->first()->id,
            'client_id' => Client::factory(),
            'registration_plate' => fake()->unique()->word(),
        ];
    }

    public function withVisits(int $count = 1): static
    {
        return $this->has(Visit::factory($count));
    }
}
