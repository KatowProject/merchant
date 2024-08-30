<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CekRoleAdmin
{
    /**
     * Tangani permintaan yang masuk.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user('admin');

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Pengguna bukan admin'], 403);
        }

        return $next($request);
    }
}
