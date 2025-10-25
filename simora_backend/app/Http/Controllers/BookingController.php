<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $bookings = Booking::with(['employee', 'driver', 'car'])->get();
        return response()->json(['data' => $bookings]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'pickup_date' => 'required|date',
            'pickup_time' => 'required',
            'destination' => 'required|string',
            'purpose' => 'required|string',
            'notes' => 'nullable|string',
            'passenger_count' => 'required|integer|min:1',
            'passenger_names' => 'nullable|string',
            'return_time' => 'nullable'
        ]);

        $booking = Booking::create($validated);
        return response()->json(['data' => $booking], 201);
    }

    public function show($id): JsonResponse
    {
        $booking = Booking::with(['employee', 'driver', 'car'])->findOrFail($id);
        return response()->json(['data' => $booking]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'pickup_date' => 'sometimes|date',
            'pickup_time' => 'sometimes',
            'destination' => 'sometimes|string',
            'purpose' => 'sometimes|string',
            'notes' => 'nullable|string',
            'passenger_count' => 'sometimes|integer|min:1',
            'passenger_names' => 'nullable|string',
            'return_time' => 'nullable',
            'status' => 'sometimes|in:pending,approved,completed,rejected'
        ]);

        $booking->update($validated);
        return response()->json(['data' => $booking]);
    }

    public function destroy($id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        // Free up driver and car when booking is deleted
        if ($booking->driver_id) {
            Driver::where('id', $booking->driver_id)->update(['status' => 'active']);
        }
        if ($booking->car_id) {
            Car::where('id', $booking->car_id)->update(['status' => 'available']);
        }
        
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully']);
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,completed,rejected'
        ]);

        // If completing booking, free up driver and car
        if ($validated['status'] === 'completed') {
            if ($booking->driver_id) {
                Driver::where('id', $booking->driver_id)->update(['status' => 'active']);
            }
            if ($booking->car_id) {
                Car::where('id', $booking->car_id)->update(['status' => 'available']);
            }
        }

        $booking->update(['status' => $validated['status']]);
        
        // Load relationships for response
        $booking->load(['employee', 'driver', 'car']);
        
        return response()->json([
            'message' => 'Status booking berhasil diperbarui',
            'data' => $booking
        ]);
    }

    public function approve(Request $request, $id): JsonResponse
    {
        \Log::info('Approve function called', ['booking_id' => $id, 'request_data' => $request->all()]);
        $booking = Booking::findOrFail($id);
        
        $validated = $request->validate([
            'driver_id' => 'required|exists:drivers,id',
            'car_id' => 'required|exists:cars,id'
        ]);

        // Update booking status and assign driver/car
        $booking->update([
            'status' => 'approved',
            'driver_id' => $validated['driver_id'],
            'car_id' => $validated['car_id']
        ]);

        // Update driver status to booked
        Driver::where('id', $validated['driver_id'])->update(['status' => 'booked']);

        // Update car status to booked
        Car::where('id', $validated['car_id'])->update(['status' => 'booked']);

        return response()->json(['data' => $booking]);
    }

    public function reject(Request $request, $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string|min:10',
            'rejected_by' => 'required|string'
        ]);

        // Free up driver and car when booking is rejected
        if ($booking->driver_id) {
            Driver::where('id', $booking->driver_id)->update(['status' => 'active']);
        }
        if ($booking->car_id) {
            Car::where('id', $booking->car_id)->update(['status' => 'available']);
        }

        $booking->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
            'rejected_by' => $validated['rejected_by']
        ]);

        return response()->json(['data' => $booking]);
    }
}