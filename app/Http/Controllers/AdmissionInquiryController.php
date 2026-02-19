<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdmissionInquiryRequest;
use App\Mail\NewAdmissionInquiryMail;
use App\Models\AdmissionInquiry;
use App\Models\User;
use App\Notifications\NewAdmissionInquiry;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
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
        $inquiry = AdmissionInquiry::create($request->validated());

        $admins = User::where('role', 'admin')->get();

        Notification::send($admins, new NewAdmissionInquiry($inquiry));

        Mail::to(config('app.mail_recipient'))->queue(new NewAdmissionInquiryMail($inquiry));

        return redirect()->route('inquire')->with('success', 'Thank you! Your inquiry has been received. A member of our team will reach out to you shortly.');
    }
}
