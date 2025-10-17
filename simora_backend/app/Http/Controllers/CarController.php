<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        return response()->json(['success' => true, 'data' => $cars]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'brand' => 'required|string|max:255',
                'model' => 'required|string|max:255',
                'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
                'license_plate' => 'required|string|unique:cars',
                'color' => 'required|string',
                'fuel_type' => 'required|in:gasoline,diesel,electric,hybrid',
                'transmission' => 'required|in:manual,automatic',
                'capacity' => 'required|integer|min:1',
                'photo' => 'nullable|string',
                'status' => 'required|in:available,booked,maintenance,out_of_service',
                'mileage' => 'nullable|integer|min:0',
                'last_service' => 'nullable|date',
                'next_service' => 'nullable|date',
            ]);

            $car = Car::create($validated);
            return response()->json(['success' => true, 'data' => $car], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function show(Car $car)
    {
        return response()->json(['success' => true, 'data' => $car]);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'string|max:255',
            'model' => 'string|max:255',
            'year' => 'integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'string|unique:cars,license_plate,' . $car->id,
            'color' => 'string',
            'fuel_type' => 'in:gasoline,diesel,electric,hybrid',
            'transmission' => 'in:manual,automatic',
            'capacity' => 'integer|min:1',
            'photo' => 'nullable|string',
            'status' => 'in:available,booked,maintenance,out_of_service',
            'mileage' => 'nullable|integer|min:0',
            'last_service' => 'nullable|date',
            'next_service' => 'nullable|date',
        ]);

        $car->update($validated);
        return response()->json(['success' => true, 'data' => $car]);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return response()->json(['success' => true, 'message' => 'Car deleted']);
    }
}
