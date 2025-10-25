@echo off
echo Cleaning email duplicates...
echo.

echo Running migration to clean duplicate emails...
php artisan migrate --path=database/migrations/2025_01_21_000003_clean_duplicate_emails.php
echo.

echo Checking for remaining duplicates...
php artisan tinker --execute="
use App\Models\User;
use App\Models\Employee;
echo 'Users with email azijulakbar@gmail.com: ' . User::where('email', 'azijulakbar@gmail.com')->count() . PHP_EOL;
echo 'Employees with email azijulakbar@gmail.com: ' . Employee::where('email', 'azijulakbar@gmail.com')->count() . PHP_EOL;
"

echo.
echo Email cleanup completed!
pause