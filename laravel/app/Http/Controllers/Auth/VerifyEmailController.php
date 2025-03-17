<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    use ApiResponse;

    /**
     * Verify the user's email address.
     */
    public function __invoke(EmailVerificationRequest $request): JsonResponse|RedirectResponse
    {
        // Check if the user has already verified their email
        if ($request->user()->hasVerifiedEmail())
        {
            return redirect()->intended('/home');
        }

        // Verify the user's email and dispatch the verified event
        $request->fulfill();

        return $this->successResponse([
            'message' => 'Email has been verified',
        ]);
    }
}
