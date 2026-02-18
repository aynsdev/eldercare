<?php

namespace App\Actions\BlogPost;

use App\Models\BlogPost;
use Illuminate\Pagination\LengthAwarePaginator;

class GetBlogPosts
{
    public function execute(): LengthAwarePaginator
    {
        return BlogPost::query()
            ->with('category:id,name')
            ->latest()
            ->paginate(20);
    }
}
