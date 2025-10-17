<?php

namespace Database\Factories;

use App\Models\AnnualScan;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AnnualScan>
 */
class AnnualScanFactory extends Factory
{
    public function definition(): array
    {
        if (fake()->boolean()) {
            $scanDate = now()->subDays(fake()->numberBetween(0, 7));
        } else {
            $scanDate = now()->subDays(fake()->numberBetween(0, 7))->subYear();
        }
        $expiryDate = $scanDate->clone()->addYear();
        $client = Client::factory()->withCars(5)->create();
        $car = $client->cars()->inRandomOrder()->first();

        return [
            'client_id' => $client->id,
            'car_id' => $car->id,
            'scan_date' => $scanDate,
            'expiry_date' => $expiryDate,
            'is_passed' => fake()->boolean(),
            'cost' => fake()->randomNumber(2),
            'test_report' => fake()->text(),
            'notes' => fake()->text(),
        ];
    }
}
