<?php

use App\Models\Car;
use App\Models\Client;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annual_scans', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Client::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Car::class)->constrained()->cascadeOnDelete();
            $table->date('scan_date');
            $table->date('expiry_date');
            $table->boolean('is_passed')->default(true);
            $table->float('cost')->default(0.0000);
            $table->text('test_report')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annual_scans');
    }
};
