<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'license_number',
        'license_expiry',
        'address',
        'join_date',
        'experience_years',
        'photo',
        'status',
        'rating',
        'working_hours',
        'total_trips',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}