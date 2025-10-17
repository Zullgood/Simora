<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;


class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['employee', 'driver', 'car'])->get();
        return response()->json(['success' => true, 'data' => $bookings]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'destination' => 'required|string',
            'pickup_date' => 'required|date',
            'pickup_time' => 'required|string',
            'return_time' => 'nullable|string',
            'passenger_count' => 'nullable|integer|min:1',
            'purpose' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $validated['status'] = 'pending';
        $booking = Booking::create($validated);
        $booking->load(['employee', 'driver', 'car']);
        
        return response()->json(['success' => true, 'data' => $booking], 201);
    }

    public function show(Booking $booking)
    {
        $booking->load(['employee', 'driver', 'car']);
        return response()->json(['success' => true, 'data' => $booking]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'employee_id' => 'exists:employees,id',
            'driver_id' => 'nullable|exists:drivers,id',
            'car_id' => 'nullable|exists:cars,id',
            'destination' => 'string',
            'pickup_date' => 'date',
            'pickup_time' => 'string',
            'return_time' => 'nullable|string',
            'passenger_count' => 'nullable|integer|min:1',
            'purpose' => 'string',
            'status' => 'in:pending,approved,rejected,completed',
            'notes' => 'nullable|string',
        ]);

        // Handle completion - release driver and car
        if (isset($validated['status']) && $validated['status'] === 'completed') {
            if ($booking->driver_id) {
                \App\Models\Driver::where('id', $booking->driver_id)
                    ->update(['status' => 'active']);
            }
            if ($booking->car_id) {
                \App\Models\Car::where('id', $booking->car_id)
                    ->update(['status' => 'available']);
            }
            $validated['completed_at'] = now();
        }

        $booking->update($validated);
        $booking->load(['employee', 'driver', 'car']);
        
        return response()->json(['success' => true, 'data' => $booking]);
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['success' => true, 'message' => 'Booking deleted']);
    }

    public function approve(Request $request, Booking $booking)
    {
        try {
            $validated = $request->validate([
                'driver_id' => 'required|exists:drivers,id',
                'car_id' => 'required|exists:cars,id',
                'notes' => 'nullable|string',
            ]);

            // Update driver status to on_duty
            \App\Models\Driver::where('id', $validated['driver_id'])
                ->update(['status' => 'on_duty']);
                
            // Update car status to booked
            \App\Models\Car::where('id', $validated['car_id'])
                ->update(['status' => 'booked']);

            $booking->update([
                'status' => 'approved',
                'driver_id' => $validated['driver_id'],
                'car_id' => $validated['car_id'],
                'notes' => $validated['notes'] ?? $booking->notes,
            ]);

            $booking->load(['employee', 'driver', 'car']);
            return response()->json(['success' => true, 'data' => $booking]);
        } catch (\Exception $e) {
            \Log::error('Booking approval error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function reject(Request $request, Booking $booking)
    {
        try {
            $validated = $request->validate([
                'notes' => 'nullable|string',
            ]);

            $booking->update([
                'status' => 'rejected',
                'notes' => $validated['notes'] ?? $booking->notes,
            ]);

            $booking->load(['employee', 'driver', 'car']);
            return response()->json(['success' => true, 'data' => $booking]);
        } catch (\Exception $e) {
            \Log::error('Booking rejection error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}