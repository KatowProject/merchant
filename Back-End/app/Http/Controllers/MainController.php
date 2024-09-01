<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class MainController extends Controller
{
    private $m_product;
    private $m_category;

    function __construct()
    {
        $this->m_product = new Product();
        $this->m_category = new Category();
    }

    public function me(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json([
                'message' => 'Token not found'
            ], 401);
        }

        $payload = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        $user = User::find($payload->user_id);

        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->userauth;
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'Profile updated'
        ]);
    }

    public function getDiscovery(Request $request)
    {
        // get first of 5 categories
        $categories = $this->m_category->limit(5)->get();

        // get best seller products (base on table order_products, but data return as table products)
        $best_seller = $this->m_product->select('products.*')
        ->join('order_product', 'products.id', '=', 'order_product.product_id')
        ->groupBy('products.id')
        ->orderByRaw('SUM(order_product.quantity) DESC')
        ->get();

        // if best seller not found, get first 5 products
        if ($best_seller->count() == 0) {
            $best_seller = $this->m_product->limit(5)->get();
        }

        $best_seller->load('category');
        $best_seller->load('subCategory');

        // get random 10 products
        $recommended = $this->m_product->inRandomOrder()->limit(10)->get();
        $recommended->load('category');
        $recommended->load('subCategory');


        // get all product (limit 25)
        $products = $this->m_product->limit(50)->get();
        $products->load('category');
        $products->load('subCategory');

        return response()->json([
            'categories' => $categories,
            'best_seller' => $best_seller,
            'recommended' => $recommended,
            'products' => $products
        ]);
    }

    public function addToCart(Request $request, $id)
    {
        $user_id = $request->userauth->id;

        $product = $this->m_product->find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $cart = Cart::where('user_id', $user_id)
            ->where('product_id', $id)
            ->first();

        if ($cart) {
            $cart->quantity += 1;
            $cart->save();
        } else {
            Cart::create([
                'user_id' => $user_id,
                'product_id' => $id,
                'quantity' => 1
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart'
        ]);
    }

    public function getCart(Request $request)
    {
        $user_id = $request->get('userauth')->id;

        $carts = Cart::where('user_id', $user_id)->get();

        $carts->load('product');

        $total = 0;

        foreach ($carts as $cart) {
            $total += (float) $cart->product->price * $cart->quantity;
        }

        return response()->json([
            'carts' => $carts,
            'total' => $total
        ]);

        return response()->json($carts);
    }

    public function updateCart(Request $request, $id)
    {
        $user_id = $request->get('userauth')->id;

        // get data from body json
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        // get cart data
        $cart = Cart::where('user_id', $user_id)
            ->where('product_id', $id)
            ->first();

        // check if cart not found
        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found'
            ], 404);
        }

        // check if quantity is 0, then delete the cart
        if ($request->quantity == 0) {
            $cart->delete();
        } else {
            $cart->quantity = $request->quantity;
            $cart->save();
        }

        return response()->json([
            'message' => 'Cart updated'
        ]);
    }

    public function deleteCart(Request $request, $id)
    {
        $user_id = $request->get('userauth')->id;

        $cart = Cart::where('user_id', $user_id)
            ->where('product_id', $id)
            ->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found'
            ], 404);
        }

        $cart->delete();

        return response()->json([
            'message' => 'Cart deleted'
        ]);
    }

    public function createOrder(Request $request)
    {
        $user_id = $request->get('userauth')->id;

        // get body json
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:10',
            'post_code' => 'required|string|max:10',
            'phone_number' => 'required|string|max:15',
        ]);

        $carts = Cart::where('user_id', $user_id)->get();

        $order_number = 'INV/' . date('Ymd') . '/' . date('his');
        $total = 0;

        foreach ($carts as $cart) {
            $total += (float) $cart->product->price * $cart->quantity;
        }

        $order = Order::create([
            'user_id' => $user_id,
            'name' => $request->name,
            'shipping_address' => $request->address,
            'postal_code' => $request->post_code,
            'phone_number' => $request->phone_number,
            'order_number' => $order_number,
            'total_amount' => $total,
            'status' => 'pending'
        ]);

        foreach ($carts as $cart) {
            OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $cart->product_id,
                'quantity' => $cart->quantity,
                'price' => $cart->product->price
            ]);

            // update stock
            $product = Product::find($cart->product_id);

            $product->stock -= $cart->quantity;

            $product->save();
        }

        $carts->each->delete();

        return response()->json([
            'message' => 'Order created'
        ]);
    }

    public function getOrders(Request $request)
    {
        $user_id = $request->get('userauth')->id;

        $orders = Order::where('user_id', $user_id)->get();

        $orders->load('products');

        return response()->json($orders);
    }
}
