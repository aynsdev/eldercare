<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\NewInquiryMail;
use App\Models\Inquiry;
use App\Models\User;
use App\Notifications\NewInquiry;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): \Illuminate\Http\RedirectResponse
    {
        $inquiry = Inquiry::create($request->validated());

        $admins = User::where('role', 'admin')->get();

        Notification::send($admins, new NewInquiry($inquiry));

        Mail::to(config('app.mail_recipient'))->queue(new NewInquiryMail($inquiry));

        return redirect()->route('contact')->with('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
    }
}
