<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Testimonial\GetTestimonials;
use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(GetTestimonials $action): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => $action->execute(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/testimonials/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'relation' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'status' => ['required', 'in:pending,approved,rejected'],
        ]);

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial created.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'relation' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'status' => ['required', 'in:pending,approved,rejected'],
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted.');
    }

    public function approve(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['status' => 'approved']);

        return back()->with('success', 'Testimonial approved.');
    }

    public function reject(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['status' => 'rejected']);

        return back()->with('success', 'Testimonial rejected.');
    }
}
