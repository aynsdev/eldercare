<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Inquiry\GetInquiries;
use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function updateStatus(Inquiry $inquiry, Request $request): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:new,read,replied,closed'],
        ]);

        $status = $request->status;
        $timestampColumn = match ($status) {
            'read' => 'read_at',
            'replied' => 'replied_at',
            'closed' => 'closed_at',
            default => null,
        };

        $inquiry->update(array_filter([
            'status' => $status,
            $timestampColumn => $timestampColumn && ! $inquiry->$timestampColumn ? now() : null,
        ], fn ($v) => $v !== null));

        return back()->with('success', 'Status updated.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')
            ->with('success', 'Inquiry deleted.');
    }
}
