<?php

use App\Models\BlogPost;
use App\Models\Inquiry;
use App\Models\Testimonial;

test('home page loads successfully', function () {
    $this->get('/')->assertOk()->assertInertia(fn ($page) => $page->component('home'));
});

test('home page shows approved testimonials', function () {
    Testimonial::factory()->count(3)->create(['status' => 'approved']);
    Testimonial::factory()->create(['status' => 'pending']);

    $this->get('/')->assertOk()->assertInertia(
        fn ($page) => $page->component('home')->has('testimonials', 3)
    );
});

test('about page loads successfully', function () {
    $this->get('/about')->assertOk()->assertInertia(fn ($page) => $page->component('about'));
});

test('services page loads successfully', function () {
    $this->get('/services')->assertOk()->assertInertia(fn ($page) => $page->component('services'));
});

test('faqs page loads successfully', function () {
    $this->get('/faqs')->assertOk()->assertInertia(fn ($page) => $page->component('faqs'));
});

test('contact page loads successfully', function () {
    $this->get('/contact')->assertOk()->assertInertia(fn ($page) => $page->component('contact'));
});

test('contact form stores inquiry and redirects with success message', function () {
    $this->post('/contact', [
        'name' => 'Maria Reyes',
        'email' => 'maria@example.com',
        'phone' => '+63 915 000 0000',
        'preferred_contact' => 'phone',
        'message' => 'I would like to schedule a tour for my mother.',
    ])
        ->assertRedirect('/contact')
        ->assertSessionHas('success');

    expect(Inquiry::count())->toBe(1);
    expect(Inquiry::first()->name)->toBe('Maria Reyes');
});

test('contact form validates required fields', function () {
    $this->post('/contact', [])
        ->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact form rejects invalid email', function () {
    $this->post('/contact', [
        'name' => 'Test User',
        'email' => 'not-an-email',
        'message' => 'Test message',
    ])->assertSessionHasErrors(['email']);
});

test('blog page loads with published posts', function () {
    BlogPost::factory()->count(3)->create(['status' => 'published', 'published_at' => now()]);
    BlogPost::factory()->draft()->create();

    $this->get('/blog')->assertOk()->assertInertia(
        fn ($page) => $page->component('blog')->has('posts', 3)
    );
});
