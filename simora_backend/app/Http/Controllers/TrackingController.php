<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class TrackingController extends Controller
{
    public function getActiveBookings()
    {
        try {
            $activeBookings = Booking::with(['employee', 'driver', 'car'])
                ->where('status', 'approved')
                ->whereDate('pickup_date', '<=', now())
                ->where(function($query) {
                    $query->whereDate('return_date', '>=', now())
                          ->orWhereNull('return_date');
                })
                ->get();

            return response()->json([
                'success' => true,
                'data' => $activeBookings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching active bookings: ' . $e->getMessage()
            ], 500);
        }
    }
}