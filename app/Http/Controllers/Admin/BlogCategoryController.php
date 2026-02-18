<?php

namespace App\Http\Controllers\Admin;

use App\Actions\BlogCategory\GetBlogCategories;
use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    public function index(GetBlogCategories $action): Response
    {
        return Inertia::render('admin/blog/categories/index', [
            'categories' => $action->execute(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:blog_categories,name'],
        ]);

        BlogCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, BlogCategory $blogCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:blog_categories,name,'.$blogCategory->id],
        ]);

        $blogCategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(BlogCategory $blogCategory): RedirectResponse
    {
        $blogCategory->delete();

        return back()->with('success', 'Category deleted.');
    }
}
