<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogCategory>
 */
class BlogCategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Health & Wellness',
            'Nutrition',
            'Mental Health',
            'Safety',
            'Social Wellness',
            'Activities',
            'Caregiver Tips',
            'Memory Care',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
