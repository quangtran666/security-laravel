<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    use ApiResponse;

    /**
     * Send a new email verification notification.
     */
    public function __invoke(Request $request) : JsonResponse
    {
       if ($request->user()->hasVerifiedEmail())
       {
           return $this->successResponse([
               'message' => 'Email already verified'
           ]);
       }

       // Resend the email verification notification
       $request->user()->sendEmailVerificationNotification();

       return $this->successResponse([
           'message' => 'Verification link sent',
           'status' => 'verification-link-sent'
       ]);
    }
}
