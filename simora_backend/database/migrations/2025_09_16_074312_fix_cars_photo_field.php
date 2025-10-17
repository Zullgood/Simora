<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->longText('photo')->nullable()->change();
            $table->dropColumn('status');
        });
        
        Schema::table('cars', function (Blueprint $table) {
            $table->enum('status', ['available', 'booked', 'maintenance', 'out_of_service'])->default('available');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->text('photo')->nullable()->change();
            $table->dropColumn('status');
        });
        
        Schema::table('cars', function (Blueprint $table) {
            $table->enum('status', ['available', 'in_use', 'maintenance'])->default('available');
        });
    }
};