<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('drivers', function (Blueprint $table) {
            if (!Schema::hasColumn('drivers', 'status')) {
                $table->enum('status', ['available', 'on_duty'])->default('available');
            }
        });

        Schema::table('cars', function (Blueprint $table) {
            if (!Schema::hasColumn('cars', 'status')) {
                $table->enum('status', ['available', 'in_use', 'maintenance'])->default('available');
            }
        });
    }

    public function down()
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};