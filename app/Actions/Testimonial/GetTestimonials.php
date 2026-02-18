<?php

namespace App\Actions\Testimonial;

use App\Models\Testimonial;
use Illuminate\Pagination\LengthAwarePaginator;

class GetTestimonials
{
    public function execute(): LengthAwarePaginator
    {
        return Testimonial::query()
            ->latest()
            ->paginate(20);
    }
}
