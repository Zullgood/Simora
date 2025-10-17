<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Driver;
use App\Models\Car;
use App\Models\Booking;
use Carbon\Carbon;

class DummyDataSeeder extends Seeder
{
    public function run()
    {
        // Create Employees
        $employees = [
            ['name' => 'John Doe', 'email' => 'john@company.com', 'department' => 'IT', 'phone' => '081234567890', 'nik' => '1234567890123456', 'employee_id' => 'EMP001', 'position' => 'Developer'],
            ['name' => 'Jane Smith', 'email' => 'jane@company.com', 'department' => 'Marketing', 'phone' => '081234567891', 'nik' => '1234567890123457', 'employee_id' => 'EMP002', 'position' => 'Marketing Manager'],
            ['name' => 'Bob Wilson', 'email' => 'bob@company.com', 'department' => 'Finance', 'phone' => '081234567892', 'nik' => '1234567890123458', 'employee_id' => 'EMP003', 'position' => 'Finance Analyst'],
            ['name' => 'Alice Brown', 'email' => 'alice@company.com', 'department' => 'HR', 'phone' => '081234567893', 'nik' => '1234567890123459', 'employee_id' => 'EMP004', 'position' => 'HR Manager'],
            ['name' => 'Charlie Davis', 'email' => 'charlie@company.com', 'department' => 'Operations', 'phone' => '081234567894', 'nik' => '1234567890123460', 'employee_id' => 'EMP005', 'position' => 'Operations Manager'],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }

        // Create Drivers
        $drivers = [
            ['name' => 'Ahmad Supardi', 'email' => 'ahmad@company.com', 'phone' => '081234567895', 'license_number' => 'A123456789', 'license_expiry' => '2025-12-31', 'rating' => 4.8, 'status' => 'available'],
            ['name' => 'Budi Santoso', 'email' => 'budi@company.com', 'phone' => '081234567896', 'license_number' => 'B123456789', 'license_expiry' => '2025-12-31', 'rating' => 4.6, 'status' => 'available'],
            ['name' => 'Candra Wijaya', 'email' => 'candra@company.com', 'phone' => '081234567897', 'license_number' => 'C123456789', 'license_expiry' => '2025-12-31', 'rating' => 4.7, 'status' => 'available'],
            ['name' => 'Dedi Kurniawan', 'email' => 'dedi@company.com', 'phone' => '081234567898', 'license_number' => 'D123456789', 'license_expiry' => '2025-12-31', 'rating' => 4.5, 'status' => 'available'],
        ];

        foreach ($drivers as $driver) {
            Driver::create($driver);
        }

        // Create Cars
        $cars = [
            ['brand' => 'Toyota', 'model' => 'Avanza', 'year' => 2020, 'license_plate' => 'B1234ABC', 'status' => 'available'],
            ['brand' => 'Honda', 'model' => 'Civic', 'year' => 2019, 'license_plate' => 'B5678DEF', 'status' => 'available'],
            ['brand' => 'Suzuki', 'model' => 'Ertiga', 'year' => 2021, 'license_plate' => 'B9012GHI', 'status' => 'available'],
            ['brand' => 'Daihatsu', 'model' => 'Xenia', 'year' => 2020, 'license_plate' => 'B3456JKL', 'status' => 'available'],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }

        // Create Bookings for the last 8 weeks
        $statuses = ['pending', 'approved', 'completed', 'cancelled'];
        $destinations = ['Kantor Cabang Jakarta', 'Meeting Client', 'Bank BCA Sudirman', 'Bandara Soekarno Hatta', 'Mall Taman Anggrek'];
        
        for ($week = 8; $week >= 1; $week--) {
            $bookingsPerWeek = rand(8, 25);
            
            for ($i = 0; $i < $bookingsPerWeek; $i++) {
                $createdAt = Carbon::now()->subWeeks($week)->addDays(rand(0, 6));
                
                Booking::create([
                    'employee_id' => rand(1, 5),
                    'driver_id' => rand(1, 4),
                    'car_id' => rand(1, 4),
                    'destination' => $destinations[array_rand($destinations)],
                    'pickup_date' => $createdAt->format('Y-m-d'),
                    'return_date' => $createdAt->addDays(rand(0, 3))->format('Y-m-d'),
                    'pickup_time' => '08:00',
                    'return_time' => '17:00',
                    'passenger_count' => rand(1, 4),
                    'purpose' => 'Business',
                    'status' => $statuses[array_rand($statuses)],
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }
    }
}