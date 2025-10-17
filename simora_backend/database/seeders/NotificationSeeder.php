<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        
        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'type' => 'booking',
                'title' => 'Booking Baru',
                'message' => 'Ada permintaan booking mobil baru dari John Doe',
                'data' => ['booking_id' => 1],
            ]);
            
            Notification::create([
                'user_id' => $user->id,
                'type' => 'system',
                'title' => 'Maintenance Selesai',
                'message' => 'Mobil B 1234 XY telah selesai maintenance',
                'data' => ['car_id' => 1],
            ]);
        }
    }
}