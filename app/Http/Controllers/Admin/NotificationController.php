<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Notifications\DatabaseNotification;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(): Response
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->paginate(20)
            ->through(fn ($n) => [
                'id' => $n->id,
                'notification_type' => class_basename($n->type),
                'data' => $n->data,
                'read_at' => $n->read_at?->toISOString(),
                'created_at' => $n->created_at->diffForHumans(),
            ]);

        return Inertia::render('admin/notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    public function markRead(DatabaseNotification $notification): RedirectResponse
    {
        $notification->markAsRead();

        return redirect($this->resolveTargetUrl($notification));
    }

    public function markAllRead(): RedirectResponse
    {
        auth()->user()->unreadNotifications->markAsRead();

        return back();
    }

    private function resolveTargetUrl(DatabaseNotification $notification): string
    {
        $type = class_basename($notification->type);
        $data = $notification->data;

        return match ($type) {
            'NewInquiry' => isset($data['inquiry_id'])
                ? route('admin.inquiries.show', $data['inquiry_id'])
                : route('admin.inquiries.index'),
            'NewAdmissionInquiry' => isset($data['inquiry_id'])
                ? route('admin.admission-inquiries.show', $data['inquiry_id'])
                : route('admin.admission-inquiries.index'),
            'NewTestimonial' => route('admin.testimonials.index'),
            default => route('admin.notifications.index'),
        };
    }
}
