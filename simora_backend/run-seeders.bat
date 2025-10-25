@echo off
echo Running database seeders...
php artisan db:seed --class=DriverSeeder
php artisan db:seed --class=BookingSeeder
echo Seeders completed!
pause