<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'employee_id',
        'department',
        'position',
        'role',
        'hire_date',
        'nik',
        'address',
        'emergency_contact',
        'emergency_phone',
        'photo',
        'password',
        'android_username',
        'android_password',
        'status'
    ];

    protected $casts = [
        'hire_date' => 'date'
    ];

    protected $hidden = [
        'password'
    ];

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}