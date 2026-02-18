<?php

namespace App\Http\Controllers\Admin;

use App\Actions\AdmissionInquiry\GetAdmissionInquiries;
use App\Http\Controllers\Controller;
use App\Models\AdmissionInquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionInquiryController extends Controller
{
    public function index(GetAdmissionInquiries $action): Response
    {
        return Inertia::render('admin/admission-inquiries/index', [
            'inquiries' => $action->execute(),
        ]);
    }

    public function show(AdmissionInquiry $admissionInquiry): Response
    {
        return Inertia::render('admin/admission-inquiries/show', [
            'inquiry' => $admissionInquiry,
        ]);
    }

    public function markRead(AdmissionInquiry $admissionInquiry): RedirectResponse
    {
        $admissionInquiry->update(['status' => 'read']);

        return back()->with('success', 'Inquiry marked as read.');
    }

    public function destroy(AdmissionInquiry $admissionInquiry): RedirectResponse
    {
        $admissionInquiry->delete();

        return redirect()->route('admin.admission-inquiries.index')
            ->with('success', 'Inquiry deleted.');
    }
}
