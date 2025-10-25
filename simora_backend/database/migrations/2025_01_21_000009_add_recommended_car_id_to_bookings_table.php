<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (!Schema::hasColumn('bookings', 'recommended_car_id')) {
                $table->unsignedBigInteger('recommended_car_id')->nullable();
                $table->foreign('recommended_car_id')->references('id')->on('cars')->onDelete('set null');
            }
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'recommended_car_id')) {
                $table->dropForeign(['recommended_car_id']);
                $table->dropColumn('recommended_car_id');
            }
        });
    }
};