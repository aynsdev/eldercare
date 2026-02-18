<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

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
            Testimonial::create($testimonial);
        }
    }
}
