<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@simora.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'department' => 'IT',
        ]);

        // Create Regular Admin
        User::create([
            'name' => 'HRD Admin',
            'email' => 'hrd@simora.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'HRD/GA',
        ]);
    }
}