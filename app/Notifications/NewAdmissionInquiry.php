<?php

namespace App\Notifications;

use App\Models\AdmissionInquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewAdmissionInquiry extends Notification
{
    use Queueable;

    public function __construct(public AdmissionInquiry $inquiry) {}

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
            'name' => $this->inquiry->full_name,
            'resident_name' => $this->inquiry->resident_name,
            'care_service' => $this->inquiry->care_service,
        ];
    }
}
