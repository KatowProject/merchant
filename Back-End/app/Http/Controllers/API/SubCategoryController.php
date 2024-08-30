<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function __construct()
    {
        // Memastikan semua metode dilindungi oleh autentikasi Sanctum
        $this->middleware('auth:sanctum');

        // Hanya admin yang bisa mengakses metode store, update, dan destroy
        $this->middleware('role:admin')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        return SubCategory::with('category')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $subCategory = SubCategory::create($data);
        return response()->json($subCategory, 201);
    }

    public function show(SubCategory $subCategory)
    {
        return $subCategory->load('category');
    }

    public function update(Request $request, SubCategory $subCategory)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $subCategory->update($data);
        return response()->json($subCategory);
    }

    public function destroy(SubCategory $subCategory)
    {
        $subCategory->delete();
        return response()->json(null, 204);
    }
}
