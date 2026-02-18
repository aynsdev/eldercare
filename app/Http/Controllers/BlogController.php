<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::published()
            ->latest('published_at')
            ->get(['id', 'title', 'slug', 'category', 'excerpt', 'published_at']);

        return Inertia::render('blog', [
            'posts' => $posts,
        ]);
    }
}
