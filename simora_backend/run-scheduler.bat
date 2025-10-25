@echo off
echo Starting Laravel Scheduler for Simora...
echo Press Ctrl+C to stop
echo.

:loop
php artisan schedule:run
timeout /t 60 /nobreak > nul
goto loop
