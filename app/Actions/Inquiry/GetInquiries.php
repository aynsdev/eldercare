<?php

namespace App\Actions\Inquiry;

use App\Models\Inquiry;
use Illuminate\Pagination\LengthAwarePaginator;

class GetInquiries
{
    public function execute(): LengthAwarePaginator
    {
        return Inquiry::query()
            ->latest()
            ->paginate(20);
    }
}
