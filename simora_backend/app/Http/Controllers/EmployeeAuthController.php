<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Employee;

class EmployeeAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $employee = Employee::where('email', $request->email)
            ->where('status', 'active')
            ->first();

        if ($employee && Hash::check($request->password, $employee->password)) {
            $token = $employee->createToken('employee_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $employee->id,
                    'name' => $employee->name,
                    'email' => $employee->email,
                    'department' => $employee->department,
                    'position' => $employee->position,
                    'role' => $employee->role,
                    'type' => 'employee',
                    'permissions' => $this->getPermissions($employee->role)
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email atau password salah'
        ], 401);
    }

    private function getPermissions($role)
    {
        if ($role === 'admin') {
            return [
                'can_view' => true,
                'can_create' => false,
                'can_edit' => false,
                'can_delete' => false,
                'can_approve' => false
            ];
        }

        return [
            'can_view' => true,
            'can_create' => true,
            'can_edit' => true,
            'can_delete' => false,
            'can_approve' => false
        ];
    }
}