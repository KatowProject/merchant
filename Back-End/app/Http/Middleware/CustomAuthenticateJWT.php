<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class CustomAuthenticateJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            // Mencoba mengautentikasi pengguna dari token JWT
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            // Menangani token yang sudah kedaluwarsa
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            // Menangani token yang tidak valid
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (JWTException $e) {
            // Menangani kasus di mana token tidak ditemukan atau masalah lain
            return response()->json(['error' => 'Token is missing or invalid'], 401);
        }

        // Lanjutkan ke request berikutnya jika token valid
        return $next($request);
    }
}
