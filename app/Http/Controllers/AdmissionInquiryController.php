<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdmissionInquiryRequest;
use App\Models\AdmissionInquiry;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionInquiryController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('inquire');
    }

    public function store(StoreAdmissionInquiryRequest $request): \Illuminate\Http\RedirectResponse
    {
        AdmissionInquiry::create($request->validated());

        return redirect()->route('inquire')->with('success', 'Thank you! Your inquiry has been received. A member of our team will reach out to you shortly.');
    }
}
