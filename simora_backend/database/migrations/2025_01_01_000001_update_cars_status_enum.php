<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE cars MODIFY COLUMN status ENUM('available', 'in_use', 'maintenance', 'booked') DEFAULT 'available'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE cars MODIFY COLUMN status ENUM('available', 'in_use', 'maintenance') DEFAULT 'available'");
    }
};