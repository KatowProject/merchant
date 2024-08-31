<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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

    /**
     * Register a new admin.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin registered successfully', 'admin' => $admin], 201);
    }

    /**
     * Log in an admin.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('admin')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Log out the admin.
     */
    public function logout()
    {
        Auth::guard('admin')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated admin.
     */
    public function me()
    {
        return response()->json(Auth::guard('admin')->user());
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        try {
            $token = JWTAuth::parseToken()->refresh();
            return $this->respondWithToken($token);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

    /**
     * Update the admin's profile.
     */
    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:admins,email,'.$admin->id,
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);

        $updateData = [];

        if ($request->has('name')) {
            $updateData['name'] = $request->name;
        }

        if ($request->has('email')) {
            $updateData['email'] = $request->email;
        }

        if ($request->has('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        if (Admin::where('id', $admin->id)->update($updateData)) {
            $updatedAdmin = Admin::find($admin->id);
            return response()->json(['message' => 'Profile updated successfully', 'admin' => $updatedAdmin]);
        } else {
            return response()->json(['error' => 'Failed to update profile'], 500);
        }
    }

    /**
     * Delete the admin's account.
     */
    public function deleteAccount()
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        Auth::guard('admin')->logout();

        if (Admin::where('id', $admin->id)->delete()) {
            return response()->json(['message' => 'Account deleted successfully']);
        } else {
            return response()->json(['error' => 'Failed to delete account'], 500);
        }
    }

    /**
     * Get a list of all users.
     */
    public function listUsers()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    /**
     * Show a specific user.
     */
    public function showUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => $user]);
    }

    /**
     * Update a user's information.
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,'.$user->id,
        ]);

        $user->update($request->only(['name', 'email']));

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    /**
     * Delete a user.
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Get a list of all orders.
     */
    public function listOrders()
    {
        $orders = Order::with('user')->get();
        return response()->json(['orders' => $orders]);
    }

    /**
     * Show a specific order.
     */
    public function showOrder($id)
    {
        $order = Order::with('user', 'products')->findOrFail($id);
        return response()->json(['order' => $order]);
    }

    /**
     * Update an order's status.
     */
    public function updateOrder(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json(['message' => 'Order updated successfully', 'order' => $order]);
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'admin' => Auth::guard('admin')->user()
        ]);
    }
}