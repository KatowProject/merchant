<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Tambahkan ini

class CategoryController extends Controller
{
    public function __construct()
    {
        // Memastikan semua metode dilindungi oleh autentikasi JWT
        $this->middleware('auth:api');

        // Hanya admin yang bisa mengakses metode store, update, dan destroy
        $this->middleware('role:admin')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        Log::info("Accessing index method in CategoryController");
        return Category::with('subCategories')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        $category = Category::create($data);
        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        Log::info("Reached show method in CategoryController with Category ID: " . $category->id);
        return $category->load('subCategories');
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update($data);
        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
