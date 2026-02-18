<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Inquiry\GetInquiries;
use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(GetInquiries $action): Response
    {
        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $action->execute(),
        ]);
    }

    public function show(Inquiry $inquiry): Response
    {
        return Inertia::render('admin/inquiries/show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function markRead(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update(['status' => 'read']);

        return back()->with('success', 'Inquiry marked as read.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')
            ->with('success', 'Inquiry deleted.');
    }
}
