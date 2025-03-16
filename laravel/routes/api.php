<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('auth/spa')->group(function () {
   Route::post('login', [AuthController::class, 'login'])->middleware('guest');
   Route::post('register', [AuthController::class, 'register'])->middleware('guest');
   Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
