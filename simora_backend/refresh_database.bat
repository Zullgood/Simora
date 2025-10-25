@echo off
echo Refreshing database except super admin...
echo.

echo Running database refresh migration...
php artisan migrate --path=database/migrations/2025_01_21_000005_refresh_database_except_super_admin.php
echo.

echo Database refreshed successfully!
echo - All tables cleared except super admin
echo - Auto increment counters reset to 1
echo - Ready for fresh data
echo.
pause