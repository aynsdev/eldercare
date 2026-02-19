<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::published()
            ->with('category:id,name,slug')
            ->latest('published_at')
            ->get(['id', 'title', 'slug', 'category_id', 'excerpt', 'featured_image', 'published_at']);

        $categories = BlogCategory::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('blog', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::published()
            ->with('category:id,name,slug')
            ->where('slug', $slug)
            ->firstOrFail();

        $recentPosts = BlogPost::published()
            ->with('category:id,name,slug')
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->limit(5)
            ->get(['id', 'title', 'slug', 'category_id', 'published_at']);

        $categories = BlogCategory::withCount(['posts' => fn ($q) => $q->published()])
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('blog/show', [
            'post' => $post,
            'recentPosts' => $recentPosts,
            'categories' => $categories,
        ]);
    }
}
