<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\SubCategoryController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminBlogPostController;
use App\Http\Controllers\AdminFaqController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rute publik
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk admin
Route::post('/admin/register', [AdminController::class, 'register']);
Route::post('/admin/login', [AdminController::class, 'login']);

// Rute yang memerlukan autentikasi admin menggunakan JWT
Route::middleware(['jwt.auth', 'role:admin'])->group(function () {
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    Route::get('/admin/me', [AdminController::class, 'me']);
    
    // CRUD untuk produk, kategori, dan sub-kategori
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('sub-categories', SubCategoryController::class);

    // Dashboard dan manajemen konten
    Route::get('admin/dashboard', [AdminController::class, 'dashboard']);
    Route::apiResource('admin/blog-posts', AdminBlogPostController::class);
    Route::apiResource('admin/faqs', AdminFaqController::class);

    // Manajemen pengguna
    Route::get('admin/users', [AdminController::class, 'listUsers']);
    Route::get('admin/users/{user}', [AdminController::class, 'showUser']);
    Route::put('admin/users/{user}', [AdminController::class, 'updateUser']);
    Route::delete('admin/users/{user}', [AdminController::class, 'deleteUser']);

    // Manajemen pesanan
    Route::get('admin/orders', [AdminController::class, 'listOrders']);
    Route::get('admin/orders/{order}', [AdminController::class, 'showOrder']);
    Route::put('admin/orders/{order}', [AdminController::class, 'updateOrder']);

    // Laporan dan statistik
    Route::get('admin/reports/sales', [AdminController::class, 'salesReport']);
    Route::get('admin/reports/popular-products', [AdminController::class, 'popularProductsReport']);
    Route::get('admin/reports/user-activity', [AdminController::class, 'userActivityReport']);

    // Pengaturan aplikasi
    Route::get('admin/settings', [AdminController::class, 'getSettings']);
    Route::put('admin/settings', [AdminController::class, 'updateSettings']);
});

// Rute yang memerlukan autentikasi pengguna menggunakan JWT
Route::middleware('jwt.user')->group(function () {
    Route::get('me', [AuthController::class, 'me']);

    // Produk, kategori, dan sub-kategori (read-only untuk pengguna)
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    Route::get('sub-categories', [SubCategoryController::class, 'index']);
    Route::get('sub-categories/{subCategory}', [SubCategoryController::class, 'show']);
    
    // Pesanan pengguna
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::put('orders/{order}', [OrderController::class, 'update']);
    Route::delete('orders/{order}', [OrderController::class, 'destroy']);
});

// Rute publik tambahan (jika diperlukan)
Route::get('public/products', [ProductController::class, 'publicIndex']);
Route::get('public/categories', [CategoryController::class, 'publicIndex']);
