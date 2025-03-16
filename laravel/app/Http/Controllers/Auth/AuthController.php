<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * @throws ValidationException
     */
    public function login(LoginRequest $request) : JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return $this->successResponse(
            ['user' => Auth::user()],
        );
    }

    public function register(RegisterRequest $request) : JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);

        return $this->successResponse(
            ['user' => $user],
        );
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request) : JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->successResponse(
            ['message' => 'Đăng xuất thành công'],
        );
    }
}
