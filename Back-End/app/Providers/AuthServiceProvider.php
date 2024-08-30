<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Tambahkan pemetaan model ke policy di sini jika diperlukan
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Gate untuk memeriksa apakah pengguna adalah admin
        Gate::define('isAdmin', function ($user) {
            return $user->role === 'admin';
        });

        // Gate untuk memeriksa apakah pengguna adalah user
        Gate::define('isUser', function ($user) {
            return $user->role === 'user';
        });
    }
}
