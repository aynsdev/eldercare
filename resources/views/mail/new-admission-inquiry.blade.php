<x-mail::message>
# New Admission Inquiry

A new admission inquiry has been submitted.

**Inquirer**

| Field | Details |
|---|---|
| **Name** | {{ $inquiry->full_name }} |
| **Email** | {{ $inquiry->email ?: '—' }} |
| **Phone** | {{ $inquiry->phone ?: '—' }} |
| **Preferred Contact** | {{ $inquiry->preferred_contact ?: '—' }} |

**Prospective Resident**

| Field | Details |
|---|---|
| **Name** | {{ $inquiry->resident_name }} |
| **Relationship** | {{ $inquiry->relationship }} |
| **Care Service** | {{ $inquiry->care_service ?: '—' }} |
| **Move-In Timeline** | {{ $inquiry->move_in_timeline ?: '—' }} |
| **Preferred Tour Date** | {{ $inquiry->preferred_tour_date?->format('F j, Y') ?? '—' }} |

<x-mail::button :url="route('admin.admission-inquiries.index')">
View in Dashboard
</x-mail::button>

Thanks,
{{ config('app.name') }}
</x-mail::message>
