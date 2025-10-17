<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\AnalyticsController;

Route::post('/login', [AuthController::class, 'login']);

// 🔓 Routes untuk testing (sementara tanpa auth)
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/dashboard/booking-trends', [DashboardController::class, 'getBookingTrends']);
Route::get('/dashboard/car-usage', [DashboardController::class, 'getCarUsage']);
Route::get('/dashboard/booking-purposes', [DashboardController::class, 'getBookingPurposes']);
Route::get('/dashboard/top-drivers', [DashboardController::class, 'getTopDrivers']);
Route::get('/drivers', [DriverController::class, 'index']);
Route::get('/drivers/{driver}', [DriverController::class, 'show']);
Route::apiResource('bookings', BookingController::class);
Route::patch('/bookings/{booking}/approve', [BookingController::class, 'approve']);
Route::patch('/bookings/{booking}/reject', [BookingController::class, 'reject']);

// Reports (sementara tanpa auth untuk testing)
Route::get('/reports/dashboard-stats', [ReportController::class, 'getDashboardStats']);
Route::get('/reports/booking-trends', [ReportController::class, 'getBookingTrends']);
Route::get('/reports/car-utilization', [ReportController::class, 'getCarUtilization']);
Route::get('/reports/department-usage', [ReportController::class, 'getDepartmentUsage']);
Route::get('/reports/driver-performance', [ReportController::class, 'getDriverPerformance']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/change-password', [ProfileController::class, 'changePassword']);
    
    // Employees
    Route::apiResource('employees', EmployeeController::class);
    
    // Drivers (POST, PUT, DELETE tetap butuh login)
    Route::post('/drivers', [DriverController::class, 'store']);
    Route::put('/drivers/{driver}', [DriverController::class, 'update']);
    Route::delete('/drivers/{driver}', [DriverController::class, 'destroy']);
    
    // Cars
    Route::apiResource('cars', CarController::class);
    
    // Bookings
    Route::apiResource('bookings', BookingController::class);
    Route::patch('/bookings/{booking}/approve', [BookingController::class, 'approve']);
    Route::patch('/bookings/{booking}/reject', [BookingController::class, 'reject']);
    
    // Tracking
    Route::get('/tracking/active-bookings', [TrackingController::class, 'getActiveBookings']);
    Route::patch('/tracking/{booking}/location', [TrackingController::class, 'updateLocation']);
    Route::patch('/tracking/{booking}/status', [TrackingController::class, 'updateStatus']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
    
    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'getAnalytics']);
    Route::get('/analytics/booking-trends', [AnalyticsController::class, 'getBookingTrends']);
    Route::get('/analytics/driver-performance', [AnalyticsController::class, 'getDriverPerformance']);
    

    
    // Admin Users (Super Admin only)
    Route::middleware('role:super_admin')->group(function () {
        Route::apiResource('admin-users', AdminUserController::class);
        Route::apiResource('super-admins', SuperAdminController::class);
    });
});
