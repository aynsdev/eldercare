<?php

namespace App\Actions\BlogCategory;

use App\Models\BlogCategory;
use Illuminate\Database\Eloquent\Collection;

class GetBlogCategories
{
    public function execute(): Collection
    {
        return BlogCategory::withCount('posts')->orderBy('name')->get();
    }
}
