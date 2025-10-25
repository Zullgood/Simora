# Setup Auto-Reject Expired Bookings

## Fitur
Sistem akan otomatis menolak booking yang statusnya masih "pending" dan sudah melewati waktu selesai (return_time) dengan alasan: "Maaf admin lupa memproses booking ini. Booking otomatis ditolak karena melewati waktu yang dijadwalkan."

## Status
✅ Command sudah dibuat: `bookings:auto-reject`
✅ Scheduler sudah dikonfigurasi: Berjalan setiap 1 menit
✅ Migration sudah ada: rejection_reason & rejected_by
✅ Batch file untuk Windows: `run-scheduler.bat`

## Cara Setup

### 1. Test Manual Command
Jalankan command ini untuk test auto-reject secara manual:
```bash
php artisan bookings:auto-reject
```

### 2. Jalankan Scheduler (CARA CEPAT - Development)
**Windows:**
Double-click file `run-scheduler.bat` atau jalankan di terminal:
```bash
run-scheduler.bat
```
Biarkan terminal tetap terbuka. Scheduler akan berjalan setiap 1 menit.

**Linux/Mac:**
```bash
while true; do php artisan schedule:run; sleep 60; done
```

### 3. Setup Scheduler (Production - Otomatis)
**PENTING:** Laravel scheduler membutuhkan cron job atau task scheduler untuk menjalankan `php artisan schedule:run` setiap menit.

#### Windows (Task Scheduler)
1. Buka Task Scheduler
2. Create Basic Task
3. Name: "Laravel Scheduler - Simora"
4. Trigger: Daily, start at 00:00
5. Action: Start a program
   - Program: `C:\php\php.exe` (sesuaikan path PHP Anda)
   - Arguments: `artisan schedule:run`
   - Start in: `C:\Users\qinth\Simora_Backend` (path project Anda)
6. Settings: Run task every 1 minute for duration of 1 day

#### Linux/Mac (Crontab)
Tambahkan ke crontab:
```bash
* * * * * cd /path/to/Simora_Backend && php artisan schedule:run >> /dev/null 2>&1
```

### 3. Verifikasi
Scheduler akan menjalankan auto-reject setiap 5 menit. Cek log dengan:
```bash
php artisan schedule:list
```

## Cara Kerja
- Command berjalan setiap 5 menit
- Cek semua booking dengan status "pending"
- Jika `pickup_date + return_time` sudah lewat dari waktu sekarang
- Otomatis update status menjadi "rejected"
- Set rejection_reason dan rejected_by

## Testing
Untuk test, buat booking dengan:
- Status: pending
- pickup_date: kemarin atau hari ini
- return_time: waktu yang sudah lewat

Lalu jalankan:
```bash
php artisan bookings:auto-reject
```

Booking tersebut akan otomatis ditolak.
