<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): \Illuminate\Http\RedirectResponse
    {
        Inquiry::create($request->validated());

        return redirect()->route('contact')->with('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
    }
}
