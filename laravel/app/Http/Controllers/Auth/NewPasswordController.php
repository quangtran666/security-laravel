<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    use ApiResponse;

    /**
     * @throws ValidationException
     */
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
          $request->only('email', 'password', 'password_confirmation', 'token'),
          static function (User $user, string $password)  {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();

            // Sent a password reset notification to the user
            event(new PasswordReset($user));
          }
        );

        if ($status === Password::PASSWORD_RESET)
        {
            return $this->successResponse([
                'status' => __($status)
            ]);
        }

        throw ValidationException::withMessages([
            'email' => __($status)
        ]);
    }
}
