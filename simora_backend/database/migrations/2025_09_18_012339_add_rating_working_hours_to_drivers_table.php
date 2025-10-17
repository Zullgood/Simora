<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->decimal('rating', 2, 1)->default(4.5)->after('status');
            $table->integer('working_hours')->default(0)->after('rating');
            $table->integer('total_trips')->default(0)->after('working_hours');
        });
    }

    public function down(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->dropColumn(['rating', 'working_hours', 'total_trips']);
        });
    }
};