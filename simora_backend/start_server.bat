@echo off
echo Starting Simora Backend Server...
echo.
echo Backend akan berjalan di: http://localhost:8000
echo Frontend harus berjalan di: http://localhost:5173
echo.
echo Tekan Ctrl+C untuk menghentikan server
echo.
php artisan serve --host=0.0.0.0 --port=8000
pause