<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run()
    {
        $cars = [
            [
                'brand' => 'Toyota',
                'model' => 'Avanza',
                'year' => 2022,
                'license_plate' => 'B 1234 XY',
                'color' => 'Silver',
                'capacity' => 7,
                'fuel_type' => 'gasoline',
                'transmission' => 'manual',
                'mileage' => 15000,
                'status' => 'available',
                'next_service' => '2024-12-31',
            ],
            [
                'brand' => 'Honda',
                'model' => 'Brio',
                'year' => 2021,
                'license_plate' => 'B 5678 AB',
                'color' => 'Putih',
                'capacity' => 5,
                'fuel_type' => 'gasoline',
                'transmission' => 'automatic',
                'mileage' => 22000,
                'status' => 'available',
                'next_service' => '2024-11-30',
            ],
            [
                'brand' => 'Suzuki',
                'model' => 'Ertiga',
                'year' => 2023,
                'license_plate' => 'B 9012 CD',
                'color' => 'Hitam',
                'capacity' => 7,
                'fuel_type' => 'gasoline',
                'transmission' => 'manual',
                'mileage' => 8000,
                'status' => 'available',
                'next_service' => '2025-01-15',
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}