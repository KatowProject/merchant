<?php

return [
    'defaults' => [
        'guard' => 'api', // Default guard yang digunakan
        'passwords' => 'users', // Default provider password
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt',  // Menggunakan JWT sebagai driver
            'provider' => 'users',
        ],

        'admin' => [
            'driver' => 'jwt',  // Menggunakan JWT sebagai driver
            'provider' => 'admins', // Menggunakan provider untuk admins
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class, // Model untuk users
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class, // Model untuk admins
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'admins' => [
            'provider' => 'admins',
            'table' => 'admin_password_reset_tokens', // Tabel untuk reset password admin
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800, // Timeout untuk konfirmasi password
];
