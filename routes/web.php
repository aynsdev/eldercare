<?php

use App\Http\Controllers\Admin\AdmissionInquiryController as AdminAdmissionInquiryController;
use App\Http\Controllers\Admin\BlogCategoryController as AdminBlogCategoryController;
use App\Http\Controllers\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\NotificationController as AdminNotificationController;
use App\Http\Controllers\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
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

// Admin back office
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Inquiries
    Route::get('inquiries', [AdminInquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/{inquiry}', [AdminInquiryController::class, 'show'])->name('inquiries.show');
    Route::patch('inquiries/{inquiry}/read', [AdminInquiryController::class, 'markRead'])->name('inquiries.read');
    Route::delete('inquiries/{inquiry}', [AdminInquiryController::class, 'destroy'])->name('inquiries.destroy');

    // Admission inquiries
    Route::get('admission-inquiries', [AdminAdmissionInquiryController::class, 'index'])->name('admission-inquiries.index');
    Route::get('admission-inquiries/{admissionInquiry}', [AdminAdmissionInquiryController::class, 'show'])->name('admission-inquiries.show');
    Route::patch('admission-inquiries/{admissionInquiry}/read', [AdminAdmissionInquiryController::class, 'markRead'])->name('admission-inquiries.read');
    Route::delete('admission-inquiries/{admissionInquiry}', [AdminAdmissionInquiryController::class, 'destroy'])->name('admission-inquiries.destroy');

    // Testimonials
    Route::get('testimonials', [AdminTestimonialController::class, 'index'])->name('testimonials.index');
    Route::get('testimonials/create', [AdminTestimonialController::class, 'create'])->name('testimonials.create');
    Route::post('testimonials', [AdminTestimonialController::class, 'store'])->name('testimonials.store');
    Route::get('testimonials/{testimonial}/edit', [AdminTestimonialController::class, 'edit'])->name('testimonials.edit');
    Route::put('testimonials/{testimonial}', [AdminTestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy'])->name('testimonials.destroy');
    Route::patch('testimonials/{testimonial}/approve', [AdminTestimonialController::class, 'approve'])->name('testimonials.approve');
    Route::patch('testimonials/{testimonial}/reject', [AdminTestimonialController::class, 'reject'])->name('testimonials.reject');

    // Blog posts
    Route::get('blog/posts', [AdminBlogPostController::class, 'index'])->name('blog.posts.index');
    Route::get('blog/posts/create', [AdminBlogPostController::class, 'create'])->name('blog.posts.create');
    Route::post('blog/posts', [AdminBlogPostController::class, 'store'])->name('blog.posts.store');
    Route::get('blog/posts/{post}/edit', [AdminBlogPostController::class, 'edit'])->name('blog.posts.edit');
    Route::put('blog/posts/{post}', [AdminBlogPostController::class, 'update'])->name('blog.posts.update');
    Route::delete('blog/posts/{post}', [AdminBlogPostController::class, 'destroy'])->name('blog.posts.destroy');

    // Blog categories
    Route::get('blog/categories', [AdminBlogCategoryController::class, 'index'])->name('blog.categories.index');
    Route::post('blog/categories', [AdminBlogCategoryController::class, 'store'])->name('blog.categories.store');
    Route::put('blog/categories/{blogCategory}', [AdminBlogCategoryController::class, 'update'])->name('blog.categories.update');
    Route::delete('blog/categories/{blogCategory}', [AdminBlogCategoryController::class, 'destroy'])->name('blog.categories.destroy');

    // Media
    Route::post('media', [AdminMediaController::class, 'store'])->name('media.store');

    // Team
    Route::get('team', [AdminTeamController::class, 'index'])->name('team.index');
    Route::get('team/create', [AdminTeamController::class, 'create'])->name('team.create');
    Route::post('team', [AdminTeamController::class, 'store'])->name('team.store');
    Route::get('team/{team}/edit', [AdminTeamController::class, 'edit'])->name('team.edit');
    Route::put('team/{team}', [AdminTeamController::class, 'update'])->name('team.update');
    Route::delete('team/{team}', [AdminTeamController::class, 'destroy'])->name('team.destroy');
});

// Notifications
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('notifications/read-all', [AdminNotificationController::class, 'markAllRead'])->name('notifications.read-all');
    Route::post('notifications/{notification}/read', [AdminNotificationController::class, 'markRead'])->name('notifications.read');
});

// Authenticated dashboard
Route::get('dashboard', AdminDashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
