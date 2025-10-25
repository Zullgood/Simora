<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create Admin User
        User::create([
            'name' => 'Admin Simora',
            'email' => 'admin@simora.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'IT',
            'status' => 'active'
        ]);

        // Uncomment seeders if needed
        // $this->call([
        //     AdminEmployeeSeeder::class,
        //     CarSeeder::class,
        //     DummyDataSeeder::class,
        //     NotificationSeeder::class,
        // ]);
    }
}