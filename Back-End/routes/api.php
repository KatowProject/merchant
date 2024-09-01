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
use App\Http\Controllers\MainController;

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

// Rute yang memerlukan autentikasi admin menggunakan JWT
// Route::middleware('jwt.admin')->group(function () {
//     Route::get('/admin/me', [AdminController::class, 'me']);

//     // CRUD untuk produk, kategori, dan sub-kategori
//     Route::apiResource('products', ProductController::class);
//     Route::apiResource('categories', CategoryController::class);
//     Route::apiResource('sub-categories', SubCategoryController::class);

//     // Dashboard dan manajemen konten
//     Route::get('admin/dashboard', [AdminController::class, 'dashboard']);
//     Route::apiResource('admin/blog-posts', AdminBlogPostController::class);
//     Route::apiResource('admin/faqs', AdminFaqController::class);

//     // Manajemen pengguna
//     Route::get('admin/users', [AdminController::class, 'listUsers']);
//     Route::get('admin/users/{user}', [AdminController::class, 'showUser']);
//     Route::put('admin/users/{user}', [AdminController::class, 'updateUser']);
//     Route::delete('admin/users/{user}', [AdminController::class, 'deleteUser']);

//     // Manajemen pesanan
//     Route::get('admin/orders', [AdminController::class, 'listOrders']);
//     Route::get('admin/orders/{order}', [AdminController::class, 'showOrder']);
//     Route::put('admin/orders/{order}', [AdminController::class, 'updateOrder']);

//     // Laporan dan statistik
//     Route::get('admin/reports/sales', [AdminController::class, 'salesReport']);
//     Route::get('admin/reports/popular-products', [AdminController::class, 'popularProductsReport']);
//     Route::get('admin/reports/user-activity', [AdminController::class, 'userActivityReport']);

//     // Pengaturan aplikasi
//     Route::get('admin/settings', [AdminController::class, 'getSettings']);
//     Route::put('admin/settings', [AdminController::class, 'updateSettings']);
// });

Route::get('me', [MainController::class, 'me']);
Route::put('me', [MainController::class, 'updateProfile']);

// Rute yang memerlukan autentikasi pengguna menggunakan JWT
Route::middleware('jwt.user')->group(function () {

    Route::get('discovery', [MainController::class, 'getDiscovery']);

    // Produk, kategori, dan sub-kategori (read-only untuk pengguna)
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::post('products/{product}/add-to-cart', [MainController::class, 'addToCart']);

    Route::get('cart', [MainController::class, 'getCart']);
    Route::put('cart/{product}', [MainController::class, 'updateCart']);
    Route::delete('cart/{product}', [MainController::class, 'deleteCart']);

    Route::get('orders', [MainController::class, 'getOrders']);
    Route::post('orders', [MainController::class, 'createOrder']);


    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    Route::get('categories/{category}/products', [CategoryController::class, 'products']);


    // Route::get('sub-categories', [SubCategoryController::class, 'index']);
    // Route::get('sub-categories/{subCategory}', [SubCategoryController::class, 'show']);

    // Pesanan pengguna
    // Route::get('orders', [OrderController::class, 'index']);
    // Route::post('orders', [OrderController::class, 'store']);
    // Route::get('orders/{order}', [OrderController::class, 'show']);
    // Route::put('orders/{order}', [OrderController::class, 'update']);
    // Route::delete('orders/{order}', [OrderController::class, 'destroy']);
});

Route::middleware('jwt.admin')->prefix('admin')->group(function () {
    Route::get('dashboard', [AdminController::class, 'dashboard']);

    Route::get('products', [AdminController::class, 'getProducts']);
    Route::post('products', [AdminController::class, 'createProduct']);
    Route::put('products/{product}', [AdminController::class, 'updateProduct']);
    Route::delete('products/{product}', [AdminController::class, 'deleteProduct']);

    Route::get('categories', [AdminController::class, 'getCategories']);
    Route::post('categories', [AdminController::class, 'createCategory']);
    Route::put('categories/{category}', [AdminController::class, 'updateCategory']);
    Route::delete('categories/{category}', [AdminController::class, 'deleteCategory']);

    Route::get('sub-categories', [AdminController::class, 'getSubCategories']);
});