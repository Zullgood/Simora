<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->decimal('current_lat', 10, 8)->nullable();
            $table->decimal('current_lng', 11, 8)->nullable();
            $table->string('current_address')->nullable();
            $table->timestamp('last_location_update')->nullable();
            $table->timestamp('status_updated_at')->nullable();
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'current_lat', 
                'current_lng', 
                'current_address', 
                'last_location_update',
                'status_updated_at'
            ]);
        });
    }
};