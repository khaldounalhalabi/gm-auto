<?php

namespace Database\Seeders;

use App\Models\AnnualScan;
use Illuminate\Database\Seeder;

class AnnualScanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AnnualScan::factory(10)->create();
    }
}
