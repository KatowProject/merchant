<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
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
        return Product::with('category', 'subCategory')->get();
    }

    public function store(Request $request)
    {
        // Memastikan hanya admin yang bisa menambahkan produk
        if (!Gate::allows('isAdmin')) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product->load('category', 'subCategory');
    }

    public function update(Request $request, Product $product)
    {
        // Memastikan hanya admin yang bisa mengupdate produk
        if (!Gate::allows('isAdmin')) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        // Memastikan hanya admin yang bisa menghapus produk
        if (!Gate::allows('isAdmin')) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $product->delete();
        return response()->json(null, 204);
    }
}
