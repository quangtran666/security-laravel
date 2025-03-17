<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth/spa')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->middleware('guest');
        Route::post('register', [AuthController::class, 'register'])->middleware('guest');
        Route::post('forgot-password', PasswordResetLinkController::class)
            ->name('password.request');
        Route::post('reset-password/{token}', NewPasswordController::class)
            ->name('password.reset');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('email/verify', EmailVerificationPromptController::class)
            ->name('verification.notice');
        Route::post('email/verification-notification', EmailVerificationNotificationController::class)
            ->middleware(['throttle:6,1'])
            ->name('verification.send');
        Route::get('email/verify/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    });
});

