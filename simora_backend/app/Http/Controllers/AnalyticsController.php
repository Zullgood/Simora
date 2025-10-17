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
        try {
            // Summary statistics (simple counts)
            $totalBookings = Booking::count();
            $activeBookings = Booking::where('status', 'active')->count();
            $completedBookings = Booking::where('status', 'completed')->count();
            $totalCars = Car::count();
            $availableCars = Car::where('status', 'available')->count();
            $totalDrivers = Driver::count();
            $activeDrivers = Driver::where('status', 'active')->count();

            // Monthly bookings (simplified)
            $monthlyBookings = [];
            for ($i = 11; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $count = Booking::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count();
                $monthlyBookings[] = [
                    'month' => $date->month,
                    'year' => $date->year,
                    'count' => $count
                ];
            }

            // Booking status distribution
            $bookingStatus = [];
            $statuses = ['pending', 'active', 'completed', 'cancelled'];
            foreach ($statuses as $status) {
                $count = Booking::where('status', $status)->count();
                if ($count > 0) {
                    $bookingStatus[] = ['status' => $status, 'count' => $count];
                }
            }

            // Purpose distribution (simplified)
            $allBookings = Booking::whereNotNull('purpose')->get();
            $purposeCounts = [];
            foreach ($allBookings as $booking) {
                $purpose = $booking->purpose ?: 'Lainnya';
                if (!isset($purposeCounts[$purpose])) {
                    $purposeCounts[$purpose] = 0;
                }
                $purposeCounts[$purpose]++;
            }
            
            $purposeData = [];
            foreach ($purposeCounts as $purpose => $count) {
                $purposeData[] = ['purpose' => $purpose, 'count' => $count];
            }

            // Top drivers (simplified)
            $allDrivers = Driver::all();
            $topDrivers = [];
            foreach ($allDrivers as $driver) {
                $bookingCount = Booking::where('driver_id', $driver->id)->count();
                $driver->booking_count = $bookingCount;
                $topDrivers[] = $driver;
            }
            
            // Sort by booking count
            usort($topDrivers, function($a, $b) {
                return $b->booking_count - $a->booking_count;
            });
            
            $topDrivers = array_slice($topDrivers, 0, 10);

            return response()->json([
                'success' => true,
                'data' => [
                    'monthly_bookings' => $monthlyBookings,
                    'booking_status' => $bookingStatus,
                    'purpose_data' => $purposeData,
                    'top_drivers' => $topDrivers,
                    'summary' => [
                        'total_bookings' => $totalBookings,
                        'active_bookings' => $activeBookings,
                        'completed_bookings' => $completedBookings,
                        'total_cars' => $totalCars,
                        'available_cars' => $availableCars,
                        'total_drivers' => $totalDrivers,
                        'active_drivers' => $activeDrivers
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Analytics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching analytics data: ' . $e->getMessage(),
                'error' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function getBookingTrends(Request $request)
    {
        try {
            $period = $request->get('period', '12'); // months
            
            $bookings = Booking::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths($period))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $bookings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching booking trends: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDriverPerformance()
    {
        try {
            $drivers = Driver::select(
                'drivers.*',
                DB::raw('COUNT(bookings.id) as total_bookings'),
                DB::raw('AVG(CASE WHEN bookings.status = "completed" THEN 5 ELSE 3 END) as avg_rating'),
                DB::raw('COUNT(CASE WHEN bookings.status = "completed" THEN 1 END) as completed_bookings')
            )
            ->leftJoin('bookings', 'drivers.id', '=', 'bookings.driver_id')
            ->groupBy('drivers.id')
            ->orderBy('total_bookings', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $drivers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching driver performance: ' . $e->getMessage()
            ], 500);
        }
    }
}