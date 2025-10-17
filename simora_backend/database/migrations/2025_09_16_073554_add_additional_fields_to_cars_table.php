<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->integer('mileage')->nullable()->after('photo');
            $table->string('transmission')->default('manual')->after('fuel_type');
            $table->date('last_service')->nullable()->after('mileage');
            $table->date('next_service')->nullable()->after('last_service');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['mileage', 'transmission', 'last_service', 'next_service']);
        });
    }
};