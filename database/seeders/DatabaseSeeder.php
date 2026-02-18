<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AdminSeeder::class);

        // Sample testimonials for the home page
        $testimonials = [
            [
                'name' => 'Maria Reyes',
                'relation' => 'Daughter',
                'content' => 'The staff at St. Joseph Eldercare truly treats my mother like family. She has never been happier — the activities, the meals, the genuine care every day. We feel so blessed to have found this place.',
                'rating' => 5,
                'status' => 'approved',
            ],
            [
                'name' => 'Jose dela Cruz',
                'relation' => 'Son',
                'content' => 'From the moment we toured the facility, we knew this was the right place. The caregivers are attentive, the rooms are clean and comfortable, and my father loves the social activities. Highly recommended!',
                'rating' => 5,
                'status' => 'approved',
            ],
            [
                'name' => 'Cecilia Magno',
                'relation' => 'Spouse',
                'content' => 'After my husband\'s stroke, we needed professional round-the-clock care. The nursing team here has been exceptional — knowledgeable, compassionate, and always communicating with our family.',
                'rating' => 5,
                'status' => 'approved',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::firstOrCreate(['name' => $testimonial['name']], $testimonial);
        }

        // Seed blog categories
        $categories = [
            'Health & Wellness',
            'Nutrition',
            'Mental Health',
            'Safety',
            'Social Wellness',
            'Activities',
            'Caregiver Tips',
            'Memory Care',
        ];

        foreach ($categories as $name) {
            BlogCategory::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'slug' => Str::slug($name)]
            );
        }
    }
}
