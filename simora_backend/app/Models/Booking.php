<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'driver_id',
        'car_id',
        'destination',
        'pickup_date',
        'return_date',
        'pickup_time',
        'return_time',
        'passenger_count',
        'passenger_names',
        'purpose',
        'status',
        'notes',
        'rejection_reason',
        'rejected_by',
        'approved_at',
        'completed_at',
    ];

    protected $casts = [
        'pickup_date' => 'date',
        'return_date' => 'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}