<x-mail::message>
# New Contact Inquiry

You have received a new message through the contact form.

| Field | Details |
|---|---|
| **Name** | {{ $inquiry->name }} |
| **Email** | {{ $inquiry->email }} |
| **Phone** | {{ $inquiry->phone ?: '—' }} |
| **Preferred Contact** | {{ $inquiry->preferred_contact ?: '—' }} |

**Message:**

{{ $inquiry->message }}

<x-mail::button :url="route('admin.inquiries.index')">
View in Dashboard
</x-mail::button>

Thanks,
{{ config('app.name') }}
</x-mail::message>
