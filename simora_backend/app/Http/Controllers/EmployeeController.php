<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json(['success' => true, 'data' => $employees]);
    }

    public function store(Request $request)
    {
        \Log::info('Employee store request data:', $request->all());
        
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:employees,email|unique:users,email',
            'phone' => 'required|string|max:20',
            'employee_id' => 'required|string|max:50|unique:employees',
            'department' => 'required|string|max:50',
            'position' => 'required|string|max:50',
            'hire_date' => 'required|date',
            'status' => 'required|in:active,inactive,resigned,terminated',
            'nik' => 'nullable|string|max:20|unique:employees,nik',
            'address' => 'nullable|string',
            'emergency_contact' => 'nullable|string|max:100',
            'emergency_phone' => 'nullable|string|max:20',
            'photo' => 'nullable|string',
            'password' => 'nullable|string|max:255',
            'android_username' => 'nullable|string|max:50',
            'android_password' => 'nullable|string|max:255',
        ]);

        \Log::info('Employee validated data:', $validated);
        
        $employee = Employee::create($validated);
        
        \Log::info('Employee created:', $employee->toArray());
        
        return response()->json(['success' => true, 'data' => $employee], 201);
    }

    public function show(Employee $employee)
    {
        return response()->json(['success' => true, 'data' => $employee]);
    }

    public function update(Request $request, Employee $employee)
    {
        \Log::info('Employee update request data:', $request->all());
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'email' => 'sometimes|required|email|max:100|unique:employees,email,' . $employee->id . '|unique:users,email',
            'phone' => 'sometimes|required|string|max:20',
            'employee_id' => 'sometimes|required|string|max:50|unique:employees,employee_id,' . $employee->id,
            'department' => 'sometimes|required|string|max:50',
            'position' => 'sometimes|required|string|max:50',
            'hire_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|in:active,inactive,resigned,terminated',
            'nik' => 'nullable|string|max:20|unique:employees,nik,' . $employee->id,
            'address' => 'nullable|string',
            'emergency_contact' => 'nullable|string|max:100',
            'emergency_phone' => 'nullable|string|max:20',
            'photo' => 'nullable|string',
            'password' => 'nullable|string|max:255',
            'android_username' => 'nullable|string|max:50',
            'android_password' => 'nullable|string|max:255',
        ]);

        \Log::info('Employee update validated data:', $validated);
        
        $employee->update($validated);
        
        \Log::info('Employee updated:', $employee->fresh()->toArray());
        
        return response()->json(['success' => true, 'data' => $employee]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['success' => true, 'message' => 'Employee deleted']);
    }
}