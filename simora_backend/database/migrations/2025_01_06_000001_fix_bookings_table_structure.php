<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Drop old columns if they exist
            if (Schema::hasColumn('bookings', 'date')) {
                $table->dropColumn('date');
            }
            if (Schema::hasColumn('bookings', 'time')) {
                $table->dropColumn('time');
            }
            if (Schema::hasColumn('bookings', 'duration')) {
                $table->dropColumn('duration');
            }
            
            // Add new columns if they don't exist
            if (!Schema::hasColumn('bookings', 'pickup_date')) {
                $table->date('pickup_date')->after('car_id');
            }
            if (!Schema::hasColumn('bookings', 'pickup_time')) {
                $table->time('pickup_time')->after('pickup_date');
            }
            if (!Schema::hasColumn('bookings', 'return_time')) {
                $table->time('return_time')->nullable()->after('pickup_time');
            }
            if (!Schema::hasColumn('bookings', 'passenger_count')) {
                $table->integer('passenger_count')->default(1)->after('return_time');
            }
            if (!Schema::hasColumn('bookings', 'approved_at')) {
                $table->timestamp('approved_at')->nullable()->after('notes');
            }
            if (!Schema::hasColumn('bookings', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->after('approved_at');
            }
            
            // Modify purpose column to string if it's text
            $table->string('purpose')->change();
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Restore old structure
            $table->date('date')->after('car_id');
            $table->string('time')->after('date');
            $table->string('duration')->after('time');
            $table->text('purpose')->change();
            
            // Drop new columns
            $table->dropColumn(['pickup_date', 'pickup_time', 'return_time', 'passenger_count', 'approved_at', 'completed_at']);
        });
    }
};