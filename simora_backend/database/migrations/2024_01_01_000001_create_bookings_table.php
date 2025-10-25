<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('car_id')->nullable()->constrained()->onDelete('set null');
            $table->date('pickup_date');
            $table->time('pickup_time');
            $table->time('return_time')->nullable();
            $table->string('destination');
            $table->string('purpose');
            $table->text('notes')->nullable();
            $table->integer('passenger_count')->default(1);
            $table->text('passenger_names')->nullable();
            $table->enum('status', ['pending', 'approved', 'completed', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bookings');
    }
};