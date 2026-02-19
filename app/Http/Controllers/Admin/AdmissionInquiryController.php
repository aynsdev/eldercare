<?php

namespace App\Http\Controllers\Admin;

use App\Actions\AdmissionInquiry\GetAdmissionInquiries;
use App\Http\Controllers\Controller;
use App\Models\AdmissionInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function updateStatus(AdmissionInquiry $admissionInquiry, Request $request): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:new,read,in_progress,tour_scheduled,admitted,declined,closed'],
        ]);

        $status = $request->status;
        $timestampColumn = match ($status) {
            'read' => 'read_at',
            'in_progress' => 'in_progress_at',
            'tour_scheduled' => 'tour_scheduled_at',
            'admitted' => 'admitted_at',
            'declined' => 'declined_at',
            'closed' => 'closed_at',
            default => null,
        };

        $admissionInquiry->update(array_filter([
            'status' => $status,
            $timestampColumn => $timestampColumn && ! $admissionInquiry->$timestampColumn ? now() : null,
        ], fn ($v) => $v !== null));

        return back()->with('success', 'Status updated.');
    }

    public function destroy(AdmissionInquiry $admissionInquiry): RedirectResponse
    {
        $admissionInquiry->delete();

        return redirect()->route('admin.admission-inquiries.index')
            ->with('success', 'Inquiry deleted.');
    }
}
