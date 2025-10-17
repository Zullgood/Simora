@echo off
echo Setting up admin users...

echo Running migration...
php artisan migrate

echo Running seeder...
php artisan db:seed --class=SuperAdminSeeder

echo Setup complete!
echo.
echo Login credentials:
echo Super Admin - Email: superadmin@simora.com, Password: password
echo Admin - Email: admin@simora.com, Password: password
pause