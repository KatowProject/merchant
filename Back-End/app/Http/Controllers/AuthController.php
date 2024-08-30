<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $payload = [
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 30),
            'user_id' => $user->id,
            'role' => 'user',
        ];

        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            'token' => $token,
            'message' => 'User successfully registered',
            'expires_in' => (60 * 60 * 24 * 30),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !password_verify($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $payload = [
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 30),
            'user_id' => $user->id,
            'role' => 'user',
        ];

        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            'token' => $token,
            'message' => 'User successfully logged in',
            'expires_in' => (60 * 60 * 24 * 30),
        ]);
    }

    public function me()
    {
        $token = request()->get('token');

        $payload = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        $user = User::find($payload->user_id);

        return response()->json($user);
    }
}
