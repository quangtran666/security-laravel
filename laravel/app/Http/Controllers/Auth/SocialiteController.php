<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class SocialiteController extends Controller
{
    use ApiResponse;

    /**
     * Redirect to provider for authentication
     */
    public function redirectToProvider(string $provider)
    {
        if (!in_array($provider, ['github', 'facebook'])) {
            return $this->errorResponse('Không hỗ trợ đăng nhập bằng ' . $provider, 400);
        }

        return $this->successResponse([
            'redirect' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()
        ]);
    }

    public function handleProviderCallback(string $provider): JsonResponse|RedirectResponse
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();

            // Tìm user hiện có với email từ social provider
            $userInDatabase = User::where('email', $socialUser->getEmail())->first();

            // Nếu user chưa tồn tại, tạo mới
            if (!$userInDatabase)
            {
                $userInDatabase = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(Str::random(16)),
                    'email_verified_at' => now()
                ]);
            }

            Auth::login($userInDatabase, true);

            return $this->successResponse([
                'user' => $userInDatabase,
            ]);
        } catch (\Exception $ex)
        {
            return $this->errorResponse('Đăng nhập thất bại: ' . $ex->getMessage(), 500);
        }
    }
}
