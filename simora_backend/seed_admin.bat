@echo off
echo Seeding admin user...
php artisan db:seed --class=AdminUserSeeder
echo Admin user seeded successfully!
pause