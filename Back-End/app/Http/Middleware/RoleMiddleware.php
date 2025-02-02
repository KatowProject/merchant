<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Memeriksa apakah pengguna sudah terautentikasi
        if (!$request->user() || $request->user()->role !== $role) {
            // Jika pengguna tidak memiliki peran yang sesuai, berikan respon 403 Forbidden
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Jika peran sesuai, teruskan request
        return $next($request);
    }
}
