<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    public function run()
    {
        $drivers = [
            [
                'name' => 'Ahmad Supardi',
                'phone' => '081234567890',
                'license_number' => 'A123456789',
                'status' => 'active',
                'rating' => 4.8,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Budi Santoso',
                'phone' => '081234567891',
                'license_number' => 'B123456789',
                'status' => 'active',
                'rating' => 4.6,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Candra Wijaya',
                'phone' => '081234567892',
                'license_number' => 'C123456789',
                'status' => 'active',
                'rating' => 4.7,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dedi Kurniawan',
                'phone' => '081234567893',
                'license_number' => 'D123456789',
                'status' => 'active',
                'rating' => 4.5,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        foreach ($drivers as $driver) {
            Driver::create($driver);
        }
    }
}