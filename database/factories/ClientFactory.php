<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'full_name' => fake()->word(),
            'phone' => fake()->unique()->phoneNumber(),
        ];
    }

    public function withCars(int $count = 1): static
    {
        return $this->has(Car::factory($count));
    }
}
