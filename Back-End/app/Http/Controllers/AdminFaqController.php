<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;

class AdminFaqController extends Controller
{
    // Display a listing of the FAQs.
    public function index()
    {
        $faqs = Faq::all();
        return response()->json($faqs);
    }

    // Store a newly created FAQ in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq = Faq::create($validatedData);

        return response()->json($faq, 201);
    }

    // Display the specified FAQ.
    public function show($id)
    {
        $faq = Faq::findOrFail($id);
        return response()->json($faq);
    }

    // Update the specified FAQ in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'question' => 'sometimes|required|string|max:255',
            'answer' => 'sometimes|required|string',
        ]);

        $faq = Faq::findOrFail($id);
        $faq->update($validatedData);

        return response()->json($faq);
    }

    // Remove the specified FAQ from storage.
    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json(null, 204);
    }
}
