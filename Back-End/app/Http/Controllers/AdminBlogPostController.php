<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class AdminBlogPostController extends Controller
{
    // Display a listing of the blog posts.
    public function index()
    {
        $blogPosts = BlogPost::all();
        return response()->json($blogPosts);
    }

    // Store a newly created blog post in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'published_at' => 'nullable|date',
        ]);

        $blogPost = BlogPost::create($validatedData);

        return response()->json($blogPost, 201);
    }

    // Display the specified blog post.
    public function show($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        return response()->json($blogPost);
    }

    // Update the specified blog post in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'author' => 'sometimes|required|string|max:255',
            'published_at' => 'nullable|date',
        ]);

        $blogPost = BlogPost::findOrFail($id);
        $blogPost->update($validatedData);

        return response()->json($blogPost);
    }

    // Remove the specified blog post from storage.
    public function destroy($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $blogPost->delete();

        return response()->json(null, 204);
    }
}
