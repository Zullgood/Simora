<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            // Tambah kolom yang belum ada
            if (!Schema::hasColumn('employees', 'employee_id')) {
                $table->string('employee_id', 50)->nullable();
            }
            if (!Schema::hasColumn('employees', 'hire_date')) {
                $table->date('hire_date')->nullable();
            }
            if (!Schema::hasColumn('employees', 'status')) {
                $table->enum('status', ['active', 'inactive', 'resigned', 'terminated'])->default('active');
            }
            if (!Schema::hasColumn('employees', 'address')) {
                $table->text('address')->nullable();
            }
            if (!Schema::hasColumn('employees', 'emergency_contact')) {
                $table->string('emergency_contact', 100)->nullable();
            }
            if (!Schema::hasColumn('employees', 'emergency_phone')) {
                $table->string('emergency_phone', 20)->nullable();
            }
            if (!Schema::hasColumn('employees', 'password')) {
                $table->string('password', 255)->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn([
                'employee_id', 'hire_date', 'status', 'address', 
                'emergency_contact', 'emergency_phone', 'password'
            ]);
        });
    }
};