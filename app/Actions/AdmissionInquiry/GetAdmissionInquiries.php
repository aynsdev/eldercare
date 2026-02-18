<?php

namespace App\Actions\AdmissionInquiry;

use App\Models\AdmissionInquiry;
use Illuminate\Pagination\LengthAwarePaginator;

class GetAdmissionInquiries
{
    public function execute(): LengthAwarePaginator
    {
        return AdmissionInquiry::query()
            ->latest()
            ->paginate(20);
    }
}
