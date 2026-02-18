<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdmissionInquiry;
use App\Models\BlogPost;
use App\Models\Inquiry;
use App\Models\Team;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'contactInquiries' => Inquiry::count(),
                'newContactInquiries' => Inquiry::where('status', 'new')->count(),
                'admissionInquiries' => AdmissionInquiry::count(),
                'newAdmissionInquiries' => AdmissionInquiry::where('status', 'new')->count(),
                'blogPosts' => BlogPost::count(),
                'publishedPosts' => BlogPost::where('status', 'published')->count(),
                'testimonials' => Testimonial::count(),
                'pendingTestimonials' => Testimonial::where('status', 'pending')->count(),
                'teamMembers' => Team::count(),
            ],
        ]);
    }
}
