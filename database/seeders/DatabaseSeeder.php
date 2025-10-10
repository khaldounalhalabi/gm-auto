<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()
            ->create([
                'first_name' => 'Amir',
                'last_name' => 'Alrweishdy',
                'email' => 'amir@gm.com',
                'password' => '123456789',
            ]);

        $this->call([
            ClientSeeder::class,
            CarBrandSeeder::class,
            CarSeeder::class,
            VisitSeeder::class,
            AnnualScanSeeder::class,
        ]);
    }
}
