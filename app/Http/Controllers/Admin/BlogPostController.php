<?php

namespace App\Http\Controllers\Admin;

use App\Actions\BlogPost\GetBlogPosts;
use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(GetBlogPosts $action): Response
    {
        return Inertia::render('admin/blog/posts/index', [
            'posts' => $action->execute(),
        ]);
    }

    public function create(): Response
    {
        $categories = BlogCategory::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/blog/posts/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:blog_categories,id'],
            'excerpt' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog/featured', 'public');
        } else {
            unset($validated['featured_image']);
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog.posts.index')
            ->with('success', 'Blog post created.');
    }

    public function show(BlogPost $post): Response
    {
        return Inertia::render('admin/blog/posts/show', [
            'post' => $post->load('category:id,name'),
        ]);
    }

    public function edit(BlogPost $post): Response
    {
        $categories = BlogCategory::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/blog/posts/edit', [
            'post' => $post->load('category:id,name'),
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, BlogPost $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:blog_categories,id'],
            'excerpt' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('featured_image')) {
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog/featured', 'public');
        } else {
            unset($validated['featured_image']);
        }

        $post->update($validated);

        return redirect()->route('admin.blog.posts.index')
            ->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        $post->delete();

        return redirect()->route('admin.blog.posts.index')
            ->with('success', 'Blog post deleted.');
    }
}
