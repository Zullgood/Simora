<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'year',
        'license_plate',
        'color',
        'fuel_type',
        'transmission',
        'capacity',
        'photo',
        'status',
        'mileage',
        'last_service',
        'next_service',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}