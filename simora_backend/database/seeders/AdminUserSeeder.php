<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create sample admin user
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin.test@simora.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'department' => 'HRD',
            'position' => 'Admin',
            'status' => 'active'
        ]);
    }
}