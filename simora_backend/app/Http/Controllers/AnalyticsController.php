<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Driver;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function getAnalytics()
    {
        return $this->index();
    }

    public function index()
    {
        try {
            // Basic analytics data
            $totalBookings = Booking::count();
            $totalCars = Car::count();
            $totalDrivers = Driver::count();
            $totalEmployees = Employee::count();
            
            // Monthly booking trends (last 6 months)
            $monthlyTrends = Booking::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('MONTHNAME(created_at) as month_name'),
                DB::raw('COUNT(*) as total_bookings'),
                DB::raw('SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed'),
                DB::raw('SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('month', 'month_name')
            ->orderBy('month')
            ->get()
            ->map(function($item) {
                return [
                    'month' => $item->month_name ? substr($item->month_name, 0, 3) : 'Unknown',
                    'bookings' => (int) $item->total_bookings,
                    'completed' => (int) $item->completed,
                    'cancelled' => (int) $item->cancelled
                ];
            });

            // Car utilization
            $carUtilization = Car::select(
                'cars.brand',
                'cars.model',
                DB::raw('COUNT(bookings.id) as total_bookings'),
                DB::raw('COALESCE(ROUND((COUNT(CASE WHEN bookings.status IN ("approved", "completed") THEN 1 END) / NULLIF(COUNT(bookings.id), 0)) * 100, 1), 0) as utilization_rate')
            )
            ->leftJoin('bookings', 'cars.id', '=', 'bookings.car_id')
            ->groupBy('cars.id', 'cars.brand', 'cars.model')
            ->having('total_bookings', '>', 0)
            ->limit(8)
            ->get()
            ->map(function($item) {
                return [
                    'name' => $item->brand . ' ' . $item->model,
                    'utilization' => (float) $item->utilization_rate,
                    'bookings' => (int) $item->total_bookings
                ];
            });

            // Department usage
            $departmentUsage = Employee::select(
                'department',
                DB::raw('COUNT(bookings.id) as booking_count')
            )
            ->leftJoin('bookings', 'employees.id', '=', 'bookings.employee_id')
            ->groupBy('department')
            ->get();

            $totalDeptBookings = $departmentUsage->sum('booking_count');
            $colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
            
            $departmentData = $departmentUsage->map(function ($item, $index) use ($totalDeptBookings, $colors) {
                return [
                    'name' => $item->department ?: 'Unknown',
                    'value' => $totalDeptBookings > 0 ? round(($item->booking_count / $totalDeptBookings) * 100, 1) : 0,
                    'color' => $colors[$index % count($colors)]
                ];
            })->filter(function($item) {
                return $item['value'] > 0;
            })->values();

            // Booking status distribution
            $bookingStatus = Booking::select(
                'status',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('status')
            ->get()
            ->map(function($item) {
                return [
                    'status' => $item->status,
                    'count' => (int) $item->count
                ];
            });

            // Purpose/Tujuan penggunaan
            $purposeData = Booking::select(
                'purpose',
                DB::raw('COUNT(*) as count')
            )
            ->whereNotNull('purpose')
            ->where('purpose', '!=', '')
            ->groupBy('purpose')
            ->orderBy('count', 'desc')
            ->get()
            ->map(function($item) {
                return [
                    'purpose' => $item->purpose,
                    'count' => (int) $item->count
                ];
            });

            // Driver performance
            $driverPerformance = Driver::select(
                'drivers.name',
                DB::raw('COALESCE(drivers.rating, 4.5) as rating'),
                DB::raw('COUNT(bookings.id) as recent_trips'),
                DB::raw('COALESCE(drivers.working_hours, 0) as working_hours'),
                'drivers.status'
            )
            ->leftJoin('bookings', 'drivers.id', '=', 'bookings.driver_id')
            ->groupBy('drivers.id', 'drivers.name', 'drivers.rating', 'drivers.working_hours', 'drivers.status')
            ->orderBy('recent_trips', 'desc')
            ->limit(10)
            ->get()
            ->map(function($item) {
                return [
                    'name' => $item->name,
                    'trips' => (int) $item->recent_trips,
                    'rating' => (float) $item->rating,
                    'hours' => (int) $item->working_hours,
                    'status' => $item->status ?: 'active'
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => [
                        'totalBookings' => $totalBookings,
                        'totalCars' => $totalCars,
                        'totalDrivers' => $totalDrivers,
                        'totalEmployees' => $totalEmployees,
                        'carUtilization' => $totalCars > 0 ? round((Booking::where('status', 'approved')->distinct('car_id')->count() / $totalCars) * 100) : 0,
                        'averageRating' => round(Driver::avg('rating') ?: 4.5, 1)
                    ],
                    'monthlyTrends' => $monthlyTrends,
                    'carUtilization' => $carUtilization,
                    'departmentUsage' => $departmentData,
                    'driverPerformance' => $driverPerformance,
                    'bookingStatus' => $bookingStatus,
                    'purposeData' => $purposeData
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching analytics data: ' . $e->getMessage()
            ], 500);
        }
    }
}