<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Rename existing columns
            if (Schema::hasColumn('bookings', 'date')) {
                $table->renameColumn('date', 'pickup_date');
            }
            if (Schema::hasColumn('bookings', 'time')) {
                $table->renameColumn('time', 'pickup_time');
            }
            
            // Add new columns if they don't exist
            if (!Schema::hasColumn('bookings', 'return_time')) {
                $table->time('return_time')->nullable();
            }
            if (!Schema::hasColumn('bookings', 'passenger_count')) {
                $table->integer('passenger_count')->default(1);
            }
            
            // Remove duration if exists (not needed)
            if (Schema::hasColumn('bookings', 'duration')) {
                $table->dropColumn('duration');
            }
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->renameColumn('pickup_date', 'date');
            $table->renameColumn('pickup_time', 'time');
            $table->dropColumn(['return_time', 'passenger_count']);
            $table->string('duration')->nullable();
        });
    }
};