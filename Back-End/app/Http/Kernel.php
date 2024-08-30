<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Middleware global yang diterapkan pada setiap request
    ];

    protected $middlewareGroups = [
        'web' => [
            // Middleware grup web
        ],

        'api' => [
            // Hapus EnsureFrontendRequestsAreStateful jika tidak menggunakan Sanctum
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    protected $middlewareAliases = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'precognitive' => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
        'signed' => \App\Http\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'role' => \App\Http\Middleware\RoleMiddleware::class,
        'admin' => \App\Http\Middleware\EnsureAdmin::class,
        'jwt.auth' => \App\Http\Middleware\CustomAuthenticateJWT::class,
        'jwt.refresh' => \App\Http\Middleware\CustomRefreshJWT::class,
    ];
    
    protected $routeMiddleware = [
        'role' => \App\Http\Middleware\RoleMiddleware::class,
        'cek.admin' => \App\Http\Middleware\CekRoleAdmin::class,
        'jwt.auth' => \App\Http\Middleware\CustomAuthenticateJWT::class,
        'jwt.refresh' => \App\Http\Middleware\CustomRefreshJWT::class,
    ];    
}
