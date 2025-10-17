<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DriverController extends Controller
{
    public function index()
    {
        try {
            $drivers = Driver::all();
            Log::info('Drivers fetched successfully', ['count' => $drivers->count()]);
            return response()->json([
                'success' => true, 
                'data' => $drivers,
                'message' => 'Drivers retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching drivers: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch drivers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:drivers',
                'phone' => 'required|string',
                'licenseNumber' => 'required|string|unique:drivers,license_number',
                'licenseExpiry' => 'required|date',
                'address' => 'required|string',
                'joinDate' => 'required|date|before_or_equal:today',
                'photo' => 'nullable|string',
                'status' => 'required|in:active,inactive,suspended',
                'experienceYears' => 'nullable|integer|min:0',
                'workingHours' => 'nullable|integer|min:0',
                'totalTrips' => 'nullable|integer|min:0',
                'rating' => 'nullable|numeric|min:0|max:5',
            ]);

            // Map frontend field names to database field names
            $validated['license_number'] = $validated['licenseNumber'];
            $validated['license_expiry'] = $validated['licenseExpiry'];
            $validated['join_date'] = $validated['joinDate'];
            $validated['experience_years'] = $validated['experienceYears'] ?? 0;
            $validated['working_hours'] = $validated['workingHours'] ?? 0;
            $validated['total_trips'] = $validated['totalTrips'] ?? 0;
            $validated['rating'] = $validated['rating'] ?? 0;
            
            // Handle photo field - ensure it's included if provided
            if ($request->has('photo')) {
                $validated['photo'] = $request->input('photo');
            }

            unset($validated['licenseNumber'], $validated['licenseExpiry'], $validated['joinDate'], $validated['experienceYears'], $validated['workingHours'], $validated['totalTrips']);

            $driver = Driver::create($validated);
            return response()->json(['success' => true, 'data' => $driver], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function show(Driver $driver)
    {
        return response()->json(['success' => true, 'data' => $driver]);
    }

    public function update(Request $request, Driver $driver)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:drivers,email,' . $driver->id,
                'phone' => 'sometimes|string',
                'licenseNumber' => 'sometimes|string|unique:drivers,license_number,' . $driver->id,
                'licenseExpiry' => 'sometimes|date',
                'address' => 'sometimes|string',
                'joinDate' => 'sometimes|date|before_or_equal:today',
                'photo' => 'nullable|string',
                'status' => 'sometimes|in:active,inactive,on_duty',
            ]);

            // Map frontend field names to database field names
            if (isset($validated['licenseNumber'])) {
                $validated['license_number'] = $validated['licenseNumber'];
                unset($validated['licenseNumber']);
            }
            if (isset($validated['licenseExpiry'])) {
                $validated['license_expiry'] = $validated['licenseExpiry'];
                unset($validated['licenseExpiry']);
            }
            if (isset($validated['joinDate'])) {
                $validated['join_date'] = $validated['joinDate'];
                unset($validated['joinDate']);
            }
            
            // Handle photo field - ensure it's included if provided
            if ($request->has('photo')) {
                $validated['photo'] = $request->input('photo');
            }

            $driver->update($validated);
            
            Log::info('Driver updated successfully', [
                'driver_id' => $driver->id,
                'updated_fields' => array_keys($validated)
            ]);
            
            return response()->json([
                'success' => true, 
                'data' => $driver->fresh(),
                'message' => 'Driver updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating driver: ' . $e->getMessage(), [
                'driver_id' => $driver->id,
                'request_data' => $request->all(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ]);
            
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response()->json(['success' => true, 'message' => 'Driver deleted']);
    }
}