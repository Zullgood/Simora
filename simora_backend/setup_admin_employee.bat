@echo off
echo Setting up Admin Employee System...
echo.

echo Running migration for employee roles...
php artisan migrate --path=database/migrations/2025_01_21_000002_add_role_to_employees.php
echo.

echo Running admin employee seeder...
php artisan db:seed --class=AdminEmployeeSeeder
echo.

echo Admin Employee setup completed!
echo.
echo Login credentials:
echo - Admin: admin@simora.com / password (Read-only access)
echo - Employee: john@simora.com / password (Normal access)
echo.
pause