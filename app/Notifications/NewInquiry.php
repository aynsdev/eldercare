<?php

namespace App\Notifications;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewInquiry extends Notification
{
    use Queueable;

    public function __construct(public Inquiry $inquiry) {}

    /** @return list<string> */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'inquiry_id' => $this->inquiry->id,
            'name' => $this->inquiry->name,
            'email' => $this->inquiry->email,
            'message' => str($this->inquiry->message)->limit(100)->toString(),
        ];
    }
}
