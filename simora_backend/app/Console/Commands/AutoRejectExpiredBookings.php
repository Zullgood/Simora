<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use Carbon\Carbon;

class AutoRejectExpiredBookings extends Command
{
    protected $signature = 'bookings:auto-reject';
    protected $description = 'Auto reject pending bookings that have passed their scheduled time';

    public function handle()
    {
        $now = Carbon::now();
        
        // Find pending bookings where pickup_date + return_time has passed
        $expiredBookings = Booking::where('status', 'pending')
            ->get()
            ->filter(function($booking) use ($now) {
                try {
                    // Parse pickup_date (could be date or datetime)
                    $pickupDate = Carbon::parse($booking->pickup_date)->format('Y-m-d');
                    $returnTime = $booking->return_time ?? '23:59:59';
                    
                    // Create full datetime
                    $scheduledEnd = Carbon::parse($pickupDate . ' ' . $returnTime);
                    
                    // Check if scheduled end time has passed
                    return $scheduledEnd->lt($now);
                } catch (\Exception $e) {
                    \Log::error("Error parsing booking date: " . $e->getMessage(), ['booking_id' => $booking->id]);
                    return false;
                }
            });

        foreach ($expiredBookings as $booking) {
            $booking->update([
                'status' => 'rejected',
                'rejection_reason' => 'Maaf admin lupa memproses booking ini. Booking otomatis ditolak karena melewati waktu yang dijadwalkan.',
                'rejected_by' => 'System (Auto-Reject)'
            ]);
            
            $this->info("Booking ID {$booking->id} auto-rejected (scheduled: {$booking->pickup_date} {$booking->return_time})");
        }

        $this->info("Total {$expiredBookings->count()} bookings auto-rejected");
        return 0;
    }
}
