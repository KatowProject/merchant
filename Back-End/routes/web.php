<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// // Rute untuk halaman utama (welcome page)
Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// // Rute untuk pengguna biasa (login, logout)
// Route::middleware('web')->group(function () {
//     Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
//     Route::post('/login', [LoginController::class, 'login']);
//     Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
// });

// // Rute untuk pengguna yang terautentikasi
// Route::middleware(['auth', 'web'])->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     })->name('user.profile');

//     Route::get('/home', [HomeController::class, 'index'])->name('home');
// });

// // Rute untuk admin (login, logout)
// Route::middleware('web')->group(function () {
//     Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('admin.login');
//     Route::post('/admin/login', [AdminController::class, 'login']);
//     Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
// });

// // Rute untuk admin yang terproteksi dengan middleware JWT dan role admin
// Route::middleware(['auth:api', 'role:admin'])->group(function () {
//     Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
//     // Tambahkan rute admin lainnya di sini, seperti manajemen pengguna, produk, dll.
// });

// // Rute default autentikasi Laravel (Jika diperlukan untuk fungsi lain seperti registrasi dan reset password)
// Auth::routes();
