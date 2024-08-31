<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $jwt = $request->bearerToken();
            $key = new Key(env("JWT_SECRET"), 'HS256');

            $decoded = JWT::decode($jwt, $key);
            $user = User::find($decoded->user_id);
            $user->role = $decoded->role;

            if ($decoded->role == "user" || $decoded->role == "admin") {    
                $request->request->add([
                    'userauth' => $user
                ]);

                return $next($request);
            } else {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Unauthorized"
            ], 401);
        }
    }
}
