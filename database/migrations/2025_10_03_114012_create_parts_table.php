<?php

use App\Models\Visit;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('invoice_number')->nullable();
            $table->string('source')->nullable();
            $table->text('notes')->nullable();
            $table->foreignIdFor(Visit::class)->constrained()->cascadeOnDelete();
            $table->float('quantity')->default(0);
            $table->float('item_price')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
