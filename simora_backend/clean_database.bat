@echo off
echo Cleaning database except super admin...
echo.

echo Running database cleanup migration...
php artisan migrate --path=database/migrations/2025_01_21_000004_clean_database_except_super_admin.php
echo.

echo Database cleaned successfully!
echo Only super admin user remains in the system.
echo.
pause