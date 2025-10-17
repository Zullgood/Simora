<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Models\Driver;
use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_employees' => Employee::count(),
            'total_drivers' => Driver::count(),
            'total_cars' => Car::count(),
            'total_bookings' => Booking::count(),
            'active_bookings' => Booking::where('status', 'approved')->count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'available_cars' => Car::where('status', 'available')->count(),
            'maintenance_cars' => Car::where('status', 'maintenance')->count(),
        ];

        $recent_bookings = Booking::with(['employee', 'driver', 'car'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'destination' => $booking->destination,
                    'booking_date' => $booking->pickup_date,
                    'return_date' => $booking->return_date ?? $booking->pickup_date,
                    'status' => $booking->status,
                    'employee' => $booking->employee ? [
                        'name' => $booking->employee->name,
                        'department' => $booking->employee->department
                    ] : null,
                    'driver' => $booking->driver ? [
                        'name' => $booking->driver->name
                    ] : null,
                    'car' => $booking->car ? [
                        'license_plate' => $booking->car->license_plate,
                        'model' => $booking->car->model
                    ] : null
                ];
            });

        $monthly_bookings = Booking::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => $stats,
                'recent_bookings' => $recent_bookings,
                'monthly_bookings' => $monthly_bookings,
            ]
        ]);
    }

    public function getBookingTrends()
    {
        // Get weekly booking trends for the last 6 weeks
        $weeks = [];
        for ($i = 5; $i >= 0; $i--) {
            $weekStart = now()->subWeeks($i)->startOfWeek();
            $weekEnd = now()->subWeeks($i)->endOfWeek();
            
            $bookingCount = Booking::whereBetween('created_at', [$weekStart, $weekEnd])->count();
            
            $weeks[] = [
                'week' => 'Minggu ' . (6 - $i),
                'bookings' => $bookingCount
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $weeks
        ]);
    }

    public function getCarUsage()
    {
        $usage = Car::withCount('bookings')
            ->get()
            ->map(function ($car) {
                return [
                    'name' => $car->brand . ' ' . $car->model,
                    'usage' => $car->bookings_count * 10 // Convert to percentage-like value
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $usage
        ]);
    }

    public function getBookingPurposes()
    {
        $purposes = Booking::selectRaw('purpose, COUNT(*) as count')
            ->groupBy('purpose')
            ->orderBy('count', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $purposes
        ]);
    }

    public function getTopDrivers()
    {
        // Get top drivers for current month
        $drivers = Driver::withCount(['bookings' => function($query) {
                $query->whereMonth('created_at', now()->month)
                      ->whereYear('created_at', now()->year);
            }])
            ->where('status', 'active')
            ->orderBy('bookings_count', 'desc')
            ->orderBy('rating', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($driver) {
                return [
                    'name' => $driver->name,
                    'trips' => $driver->bookings_count,
                    'rating' => $driver->rating ?? '0.0'
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $drivers
        ]);
    }
}