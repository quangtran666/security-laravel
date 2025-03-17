<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationPromptController extends Controller
{
    use ApiResponse;

    /**
     * Show the email verification status.
     */
    public function __invoke(Request $request) : JsonResponse
    {
        if ($request->user()->hasVerifiedEmail())
        {
            return $this->successResponse([
                'verified' => true,
                'message' => 'Email already verified'
            ]);
        }

        return $this->successResponse([
            'verified' => false,
            'message' => 'Email not verified'
        ]);
    }
}
