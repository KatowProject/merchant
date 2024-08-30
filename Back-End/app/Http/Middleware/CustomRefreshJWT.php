<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class CustomRefreshJWT
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
            // Coba untuk me-refresh token
            $newToken = JWTAuth::parseToken()->refresh();

            // Set token baru di header response
            $response = $next($request);
            $response->headers->set('Authorization', 'Bearer ' . $newToken);

            return $response;
        } catch (TokenExpiredException $e) {
            // Menangani kasus di mana token sudah kedaluwarsa dan tidak bisa di-refresh
            return response()->json(['error' => 'Token has expired and cannot be refreshed'], 401);
        } catch (TokenInvalidException $e) {
            // Menangani kasus di mana token tidak valid
            return response()->json(['error' => 'Invalid token provided'], 401);
        } catch (JWTException $e) {
            // Menangani kesalahan umum terkait JWT
            return response()->json(['error' => 'Token refresh failed'], 401);
        }
    }
}
