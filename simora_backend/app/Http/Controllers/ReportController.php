<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Driver;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function getDashboardStats(Request $request)
    {
        try {
            $dateRange = $request->get('range', 'month');
            $startDate = $this->getStartDate($dateRange);
            
            // Basic counts
            $totalBookings = Booking::where('created_at', '>=', $startDate)->count();
            $totalCars = Car::count();
            $totalDrivers = Driver::count();
            $totalEmployees = Employee::count();
            
            // Car utilization (cars currently in use)
            $carsInUse = Booking::where('status', 'approved')
                ->whereDate('pickup_date', '<=', now())
                ->where(function($query) {
                    $query->whereDate('return_date', '>=', now())
                          ->orWhereNull('return_date');
                })
                ->distinct('car_id')
                ->count();
            
            $carUtilization = $totalCars > 0 ? round(($carsInUse / $totalCars) * 100) : 0;
            
            // Average driver rating
            $averageRating = Driver::avg('rating') ?: 4.5;
            
            return response()->json([
                'success' => true,
                'data' => [
                    'totalBookings' => $totalBookings,
                    'totalCars' => $totalCars,
                    'totalDrivers' => $totalDrivers,
                    'totalEmployees' => $totalEmployees,
                    'carUtilization' => $carUtilization,
                    'averageRating' => round($averageRating, 1)
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching dashboard stats: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getBookingTrends(Request $request)
    {
        try {
            $dateRange = $request->get('range', 'month');
            $startDate = $this->getStartDate($dateRange);
            
            $bookingTrends = Booking::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('MONTHNAME(created_at) as month_name'),
                DB::raw('COUNT(*) as total_bookings'),
                DB::raw('SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed'),
                DB::raw('SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled')
            )
            ->where('created_at', '>=', $startDate)
            ->groupBy('month', 'month_name')
            ->orderBy('month')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $bookingTrends
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching booking trends: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getCarUtilization()
    {
        try {
            $carUtilization = Car::select(
                'cars.id',
                'cars.brand',
                'cars.model',
                'cars.license_plate',
                DB::raw('COUNT(bookings.id) as total_bookings'),
                DB::raw('ROUND(COALESCE((COUNT(CASE WHEN bookings.status IN ("approved", "completed") THEN 1 END) / NULLIF(COUNT(bookings.id), 0)) * 100, 0), 1) as utilization_rate')
            )
            ->leftJoin('bookings', 'cars.id', '=', 'bookings.car_id')
            ->groupBy('cars.id', 'cars.brand', 'cars.model', 'cars.license_plate')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $carUtilization
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching car utilization: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDepartmentUsage()
    {
        try {
            $departmentUsage = Employee::select(
                'department',
                DB::raw('COUNT(DISTINCT employees.id) as employee_count'),
                DB::raw('COUNT(bookings.id) as booking_count')
            )
            ->leftJoin('bookings', 'employees.id', '=', 'bookings.employee_id')
            ->groupBy('department')
            ->get();

            $total = $departmentUsage->sum('booking_count');
            
            $departmentData = $departmentUsage->map(function ($item) use ($total) {
                return [
                    'name' => $item->department,
                    'value' => $total > 0 ? round(($item->booking_count / $total) * 100, 1) : 0,
                    'bookings' => $item->booking_count,
                    'employees' => $item->employee_count
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $departmentData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching department usage: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDriverPerformance()
    {
        try {
            // Get top drivers for current month
            $driverPerformance = Driver::select(
                'drivers.id',
                'drivers.name',
                DB::raw('COALESCE(drivers.rating, 4.5) as rating'),
                DB::raw('COALESCE(drivers.total_trips, 0) as total_trips'),
                DB::raw('COALESCE(drivers.working_hours, 0) as working_hours'),
                'drivers.status',
                DB::raw('COUNT(bookings.id) as recent_trips')
            )
            ->leftJoin('bookings', function($join) {
                $join->on('drivers.id', '=', 'bookings.driver_id')
                     ->whereMonth('bookings.created_at', now()->month)
                     ->whereYear('bookings.created_at', now()->year);
            })
            ->groupBy('drivers.id', 'drivers.name', 'drivers.rating', 'drivers.total_trips', 'drivers.working_hours', 'drivers.status')
            ->orderBy('recent_trips', 'desc')
            ->limit(10)
            ->get();

            return response()->json([
                'success' => true,
                'data' => $driverPerformance
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching driver performance: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getStartDate($range)
    {
        switch ($range) {
            case 'week':
                return Carbon::now()->startOfWeek();
            case 'month':
                return Carbon::now()->startOfMonth();
            case 'quarter':
                return Carbon::now()->startOfQuarter();
            case 'year':
                return Carbon::now()->startOfYear();
            default:
                return Carbon::now()->startOfMonth();
        }
    }
}