<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Employee;
use App\Models\Car;

class BookingSeeder extends Seeder
{
    public function run()
    {
        $drivers = Driver::all();
        $employees = Employee::all();
        $cars = Car::all();

        if ($drivers->isEmpty() || $employees->isEmpty()) {
            return;
        }

        // Create bookings for current month
        for ($i = 1; $i <= 50; $i++) {
            $driver = $drivers->random();
            $employee = $employees->random();
            $car = $cars->isNotEmpty() ? $cars->random() : null;

            Booking::create([
                'employee_id' => $employee->id,
                'driver_id' => $driver->id,
                'car_id' => $car?->id,
                'pickup_date' => now()->subDays(rand(1, 30)),
                'pickup_time' => '08:00',
                'destination' => 'Jakarta Office',
                'purpose' => 'Dinas Luar',
                'status' => 'completed',
                'passenger_count' => rand(1, 4),
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()
            ]);
        }
    }
}