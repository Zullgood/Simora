<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnalyticsController;

Route::get('/', function () {
    return view('welcome');
});

// Test route untuk analytics
Route::get('/test-analytics', function() {
    $controller = new AnalyticsController();
    return $controller->getAnalytics();
});