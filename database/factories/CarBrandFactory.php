<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\CarBrand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CarBrand>
 */
class CarBrandFactory extends Factory
{
    public function definition(): array
    {
        $carBrands = [
            'Toyota',
            'Honda',
            'BMW',
            'Mercedes-Benz',
            'Audi',
            'Ford',
            'Chevrolet',
            'Nissan',
            'Hyundai',
            'Volkswagen',
        ];

        return [
            'name' => fake()->unique()->randomElement($carBrands),
        ];
    }

    public function withCars(int $count = 1): static
    {
        return $this->has(Car::factory($count));
    }
}
