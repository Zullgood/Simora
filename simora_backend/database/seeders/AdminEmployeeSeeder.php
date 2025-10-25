<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Employee;

class AdminEmployeeSeeder extends Seeder
{
    public function run()
    {
        Employee::create([
            'name' => 'Admin HRD',
            'email' => 'admin@simora.com',
            'phone' => '081234567890',
            'employee_id' => 'EMP001',
            'department' => 'HRD',
            'position' => 'HRD Manager',
            'role' => 'admin',
            'hire_date' => now(),
            'nik' => '1234567890123456',
            'address' => 'Jakarta',
            'emergency_contact' => 'Emergency Contact',
            'emergency_phone' => '081234567891',
            'password' => Hash::make('password'),
            'status' => 'active'
        ]);

        Employee::create([
            'name' => 'John Doe',
            'email' => 'john@simora.com',
            'phone' => '081234567892',
            'employee_id' => 'EMP002',
            'department' => 'Finance',
            'position' => 'Staff',
            'role' => 'employee',
            'hire_date' => now(),
            'nik' => '1234567890123457',
            'address' => 'Jakarta',
            'emergency_contact' => 'Jane Doe',
            'emergency_phone' => '081234567893',
            'password' => Hash::make('password'),
            'status' => 'active'
        ]);
    }
}