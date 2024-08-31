<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Tambahkan ini

class CategoryController extends Controller
{
    public function index()
    {
        return Category::with('subCategories')->get();
    }

    public function products($id)
    {
        $category = Category::find($id);
        $category->load('products');

        $category->products->load('category');
        $category->products->load('subCategory');
        
        return response()->json($category);
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
