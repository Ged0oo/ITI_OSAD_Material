<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->only(['name', 'email', 'password']);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (method_exists($user, 'createToken')) {
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token, 'type' => 'bearer'], 201);
        }

        return response()->json([
            'message' => 'Sanctum is not installed or User model does not support API tokens. Run `composer require laravel/sanctum` and add the HasApiTokens trait to App\\Models\\User.'
        ], 500);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (method_exists($user, 'createToken')) {
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token, 'type' => 'bearer']);
        }

        return response()->json([
            'message' => 'Sanctum is not installed or User model does not support API tokens. Run `composer require laravel/sanctum` and add the HasApiTokens trait to App\\Models\\User.'
        ], 500);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user && method_exists($user, 'currentAccessToken')) {
            $token = $user->currentAccessToken();

            if ($token && isset($token->id)) {
                $user->tokens()->where('id', $token->id)->delete();
                return response()->json(['message' => 'Logged out']);
            }

            return response()->json(['message' => 'Logged out']);
        }

        return response()->json([
            'message' => 'Sanctum is not installed or no token found to revoke.'
        ], 500);
    }
}
