<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // Mengambil semua order, bisa ditambahkan pagination
        return Order::with('user', 'products')->get();
    }

    public function store(Request $request)
    {
        // Validasi data yang diterima dari request
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
        ]);

        // Membuat pesanan baru
        $order = Order::create([
            'user_id' => $data['user_id'],
            'order_number' => 'ORD-' . strtoupper(uniqid()), // Membuat nomor order unik
            'total_amount' => 0, // Akan dihitung nanti
            'status' => 'pending',
            'shipping_address' => $data['shipping_address'],
        ]);

        // Menghitung total amount dan melampirkan produk ke pesanan
        $totalAmount = 0;

        foreach ($data['products'] as $productData) {
            $product = Product::find($productData['id']);
            $order->products()->attach($product, [
                'quantity' => $productData['quantity'],
                'price' => $product->price,
            ]);

            $totalAmount += $product->price * $productData['quantity'];
        }

        // Memperbarui total amount di pesanan
        $order->update(['total_amount' => $totalAmount]);

        return response()->json($order, 201);
    }

    public function show(Order $order)
    {
        return $order->load('user', 'products');
    }

    public function update(Request $request, Order $order)
    {
        // Validasi data yang akan diperbarui
        $data = $request->validate([
            'status' => 'nullable|string',
            'shipping_address' => 'nullable|string',
        ]);

        // Memperbarui data pesanan
        $order->update($data);

        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        // Menghapus pesanan
        $order->delete();
        return response()->json(null, 204);
    }
}
