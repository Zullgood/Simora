<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class TrackingController extends Controller
{
    public function getActiveBookings()
    {
        try {
            $bookings = Booking::with(['employee', 'driver', 'car'])
                ->whereIn('status', ['approved', 'on_trip', 'waiting'])
                ->orderBy('updated_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $bookings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data tracking'
            ], 500);
        }
    }

    public function updateLocation(Request $request, $bookingId)
    {
        try {
            $validator = Validator::make($request->all(), [
                'lat' => 'required|numeric|between:-90,90',
                'lng' => 'required|numeric|between:-180,180',
                'address' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $booking = Booking::findOrFail($bookingId);
            
            $booking->update([
                'current_lat' => $request->lat,
                'current_lng' => $request->lng,
                'current_address' => $request->address,
                'last_location_update' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Lokasi berhasil diperbarui',
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui lokasi'
            ], 500);
        }
    }

    public function updateStatus(Request $request, $bookingId)
    {
        try {
            $validator = Validator::make($request->all(), [
                'status' => 'required|in:waiting,on_trip,completed,cancelled',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $booking = Booking::findOrFail($bookingId);
            
            $booking->update([
                'status' => $request->status,
                'status_updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status berhasil diperbarui',
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui status'
            ], 500);
        }
    }
}