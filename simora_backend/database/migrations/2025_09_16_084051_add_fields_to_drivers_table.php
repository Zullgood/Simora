<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->string('email')->unique()->after('name');
            $table->date('license_expiry')->after('license_number');
            $table->text('address')->after('phone');
            $table->date('join_date')->after('address');
            $table->longText('photo')->nullable()->change();
            $table->dropColumn('status');
        });
        
        Schema::table('drivers', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
        });
    }

    public function down(): void
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->dropColumn(['email', 'license_expiry', 'address', 'join_date']);
            $table->text('photo')->nullable()->change();
            $table->dropColumn('status');
        });
        
        Schema::table('drivers', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
        });
    }
};