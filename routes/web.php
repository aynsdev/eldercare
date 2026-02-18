<?php

use App\Http\Controllers\AdmissionInquiryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\InquiryController;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public website routes
Route::get('/', function () {
    $testimonials = Testimonial::approved()->latest()->limit(3)->get();

    return Inertia::render('home', [
        'testimonials' => $testimonials,
    ]);
})->name('home');

Route::get('/about', fn () => Inertia::render('about'))->name('about');

Route::get('/team', fn () => Inertia::render('team'))->name('team');

Route::get('/services', fn () => Inertia::render('services'))->name('services');

Route::get('/faqs', fn () => Inertia::render('faqs'))->name('faqs');

Route::get('/contact', fn () => Inertia::render('contact'))->name('contact');

Route::post('/contact', [InquiryController::class, 'store'])->name('contact.store');

Route::get('/inquire', [AdmissionInquiryController::class, 'create'])->name('inquire');
Route::post('/inquire', [AdmissionInquiryController::class, 'store'])->name('inquire.store');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Authenticated dashboard
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
