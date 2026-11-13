<?php

use App\Http\Controllers\Admin\RoutesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => redirect('/dashboard'));
Route::get('/dashboard', [RoutesController::class, 'index']);

Route::prefix('d')->group(function () {
    Route::get('/signin', [RoutesController::class, 'SignIn']);
    Route::get('/signup', [RoutesController::class, 'SignUp']);
    Route::get('/notfound', [RoutesController::class, 'NotFound']);
    Route::get('/alerts', [RoutesController::class, 'Alerts']);
    Route::get('/avatars', [RoutesController::class, 'Avatar']);
    Route::get('/badge', [RoutesController::class, 'Badges']);
    Route::get('/buttons', [RoutesController::class, 'Buttons']);
    Route::get('/images', [RoutesController::class, 'Images']);
    Route::get('/videos', [RoutesController::class, 'Videos']);
    Route::get('/ecommerce', [RoutesController::class, 'Ecommerce']);
    Route::get('/calendar', [RoutesController::class, 'Calendar']);
    Route::get('/profile', [RoutesController::class, 'Profile']);
    Route::get('/line-chart', [RoutesController::class, 'LineChart']);
    Route::get('/bar-chart', [RoutesController::class, 'BarChart']);
    Route::get('/blank', [RoutesController::class, 'Blank']);
    Route::get('/basic-tables', [RoutesController::class, 'BasicTables']);
    Route::get('/form-elements', [RoutesController::class, 'FormElements']);
});
