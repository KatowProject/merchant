<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $total_produk = Product::count();
        $pesanan_masuk = Order::where('status', 'pending')->count();
        $total_pengguna = User::count();
        $pemasukan_month = Order::where('status', 'completed')->whereMonth('created_at', date('m'))->sum('total_amount');

        // ambil 5 transaksi terakhir
        $transaksi_terakhir = Order::with('user')->orderBy('created_at', 'desc')->limit(5)->get();
        $transaksi_terakhir->load('products');
        
        return response()->json([
            'total_produk' => $total_produk,
            'pesanan_masuk' => $pesanan_masuk,
            'total_pengguna' => $total_pengguna,
            'pemasukan_month' => $pemasukan_month,
            'transaksi_terakhir' => $transaksi_terakhir
        ]);
    }

    public function getProducts()
    {
        $products = Product::with('category', 'subCategory')->get();

        return response()->json($products);
    }

    public function getCategories()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function createCategory(Request $request)
    {
        $m_category = new Category();

        try {
            $request->validate([
                'name' => 'required'
            ]);

            $m_category->name = $request->name;
            $m_category->save();

            return response()->json(['message' => 'Category created successfully', 'category' => $m_category]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateCategory(Request $request, $id)
    {
        $m_category = Category::find($id);

        if (!$m_category) return response()->json(['message' => 'Category not found'], 404);

        // get body
        try {
            $m_category->name = $request->name;
            $m_category->save();

            return response()->json(['message' => 'Category updated successfully', 'category' => $m_category]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteCategory($id)
    {
        $m_category = Category::find($id);

        if (!$m_category) return response()->json(['message' => 'Category not found'], 404);

        $m_category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function getSubCategories()
    {
        $sub_categories = SubCategory::all();

        return response()->json($sub_categories);
    }

    public function createSubCategory(Request $request)
    {
        $m_sub_category = new SubCategory();

        try {
            $request->validate([
                'name' => 'required',
                'category_id' => 'required|exists:categories,id'
            ]);

            $m_sub_category->name = $request->name;
            $m_sub_category->category_id = $request->category_id;
            $m_sub_category->save();

            return response()->json(['message' => 'Sub Category created successfully', 'sub_category' => $m_sub_category]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateSubCategory(Request $request, $id)
    {
        $m_sub_category = SubCategory::find($id);

        if (!$m_sub_category) return response()->json(['message' => 'Sub Category not found'], 404);

        // get body
        try {
            $m_sub_category->name = $request->name;
            $m_sub_category->category_id = $request->category_id;
            $m_sub_category->save();

            return response()->json(['message' => 'Sub Category updated successfully', 'sub_category' => $m_sub_category]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteSubCategory($id)
    {
        $m_sub_category = SubCategory::find($id);

        if (!$m_sub_category) return response()->json(['message' => 'Sub Category not found'], 404);

        $m_sub_category->delete();

        return response()->json(['message' => 'Sub Category deleted successfully']);
    }

    public function createProduct(Request $request)
    {
        $m_product = new Product();

        try {
            $request->validate([
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'stock' => 'required',
                'category_id' => 'required|exists:categories,id',
                'sub_category_id' => 'required|exists:sub_categories,id',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $m_product->name = $request->name;
            $m_product->description = $request->description;
            $m_product->price = $request->price;
            $m_product->stock = $request->stock;
            $m_product->category_id = $request->category_id;
            $m_product->sub_category_id = $request->sub_category_id;

            // upload gambar
            $image = $request->file('image');
            $image_name = time() . '.' . $image->extension();
            $image->move(public_path('images'), $image_name);

            $m_product->image = 'images/' . $image_name;

            $m_product->save();

            return response()->json(['message' => 'Product created successfully', 'product' => $m_product]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $m_product = Product::find($id);

        if (!$m_product) return response()->json(['message' => 'Product not found'], 404);

        // get body
        try {
            $m_product->name = $request->name;
            $m_product->description = $request->description;
            $m_product->price = $request->price;
            $m_product->stock = $request->stock;
            $m_product->category_id = $request->category_id;
            $m_product->sub_category_id = $request->sub_category_id;

            if ($request->hasFile('image')) {
                // upload gambar
                $image = $request->file('image');
                $image_name = time() . '.' . $image->extension();
                $image->move(public_path('images'), $image_name);

                $m_product->image = 'images/' . $image_name;
            }

            $m_product->save();

            return response()->json(['message' => 'Product updated successfully', 'product' => $m_product]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteProduct($id)
    {
        $m_product = Product::find($id);

        if (!$m_product) return response()->json(['message' => 'Product not found'], 404);

        $m_product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function listUsers()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function showUser($id)
    {
        $user = User::find($id);

        if (!$user) return response()->json(['message' => 'User not found'], 404);

        return response()->json($user);
    }

    public function createUser(Request $request)
    {
        $m_user = new User();

        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'role' => 'required'
            ]);

            $m_user->name = $request->name;
            $m_user->email = $request->email;
            $m_user->password = bcrypt($request->password);
            $m_user->save();

            return response()->json(['message' => 'User created successfully', 'user' => $m_user]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateUser(Request $request, $id)
    {
        $m_user = User::find($id);

        if (!$m_user) return response()->json(['message' => 'User not found'], 404);

        // get body
        try {
            $m_user->name = $request->name;
            $m_user->email = $request->email;
            if ($request->password) $m_user->password = bcrypt($request->password);
            $m_user->role = $request->role;
            $m_user->save();

            return response()->json(['message' => 'User updated successfully', 'user' => $m_user]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteUser($id)
    {
        $m_user = User::find($id);

        if (!$m_user) return response()->json(['message' => 'User not found'], 404);

        $m_user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function listOrders()
    {
        $orders = Order::with('user', 'products')->get();

        return response()->json($orders);
    }

    public function approveOrder($id)
    {
        $order = Order::find($id);

        if (!$order) return response()->json(['message' => 'Order not found'], 404);

        $order->status = 'processing';
        $order->save();

        return response()->json(['message' => 'Order approved successfully']);
    }

    public function rejectOrder($id)
    {
        $order = Order::find($id);

        if (!$order) return response()->json(['message' => 'Order not found'], 404);

        $order->status = 'rejected';
        $order->save();

        return response()->json(['message' => 'Order rejected successfully']);
    }

    public function shipOrder($id)
    {
        $order = Order::find($id);

        if (!$order) return response()->json(['message' => 'Order not found'], 404);

        $order->status = 'completed';
        $order->save();

        return response()->json(['message' => 'Order shipped successfully']);
    }
    
}