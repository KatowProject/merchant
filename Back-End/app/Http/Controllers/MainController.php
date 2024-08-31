<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
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

        $payload = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        $user = User::find($payload->user_id);

        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->userauth;

        $user->update($request->all());

        return response()->json([
            'message' => 'Profile updated'
        ]);
    }

    public function getDiscovery(Request $request)
    {
        // get first of 5 categories
        $categories = $this->m_category->limit(5)->get();

        // get best seller products
        $best_seller = $this->m_product->limit(5)->get();

        $best_seller->load('category');
        $best_seller->load('subCategory');


        return response()->json([
            'categories' => $categories,
            'best_seller' => $best_seller
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
}
