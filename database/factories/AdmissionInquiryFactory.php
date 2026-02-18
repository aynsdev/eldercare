<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdmissionInquiry>
 */
class AdmissionInquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Inquirer
            'title' => fake()->randomElement(['Mr.', 'Mrs.', 'Ms.']),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'address' => fake()->optional()->address(),
            'phone' => fake()->optional()->phoneNumber(),
            'email' => fake()->optional()->safeEmail(),
            'preferred_contact' => fake()->optional()->randomElement(['Email', 'Phone', 'Text', 'Messenger', 'Other']),

            // Prospective resident
            'resident_name' => fake()->name(),
            'resident_gender' => fake()->optional()->randomElement(['Female', 'Male', 'Other']),
            'resident_address' => fake()->optional()->address(),
            'resident_date_of_birth' => fake()->optional()->dateTimeBetween('-95 years', '-60 years'),
            'relationship' => fake()->randomElement([
                'Mother', 'Father', 'Parents', 'Brother', 'Sister',
                'Grandfather', 'Grandmother', 'Mother-In-Law', 'Father-In-Law',
                'Aunt', 'Uncle', 'Spouse', 'Friend', 'Close Relative',
            ]),

            // Care needs
            'care_service' => fake()->optional()->randomElement([
                'Assisted Living', 'Memory Care', 'Skilled Nursing',
                'Respite/Short Term Stay', 'Hospice', 'Rehabilitation Services',
            ]),
            'medical_conditions' => fake()->optional()->randomElements(
                ['Dementia/Alzheimer\'s', 'Diabetes', 'Mobility Limitations', 'Oxygen Therapy', 'Other'],
                fake()->numberBetween(1, 3)
            ),
            'special_needs' => fake()->optional()->sentence(),
            'needs_walking_assistance' => fake()->optional()->boolean(),
            'is_wheelchair_bound' => fake()->optional()->boolean(20),
            'needs_bathing_assistance' => fake()->optional()->boolean(),
            'has_feeding_tube' => fake()->optional()->randomElement(['Yes', 'No', 'Sometimes']),

            // Scheduling
            'move_in_timeline' => fake()->optional()->randomElement([
                'Immediately', 'Within 1–2 weeks', 'Within a month', 'Just exploring options', 'Other',
            ]),
            'preferred_tour_date' => fake()->optional()->dateTimeBetween('now', '+2 months'),
            'preferred_tour_time' => fake()->optional()->time('H:i'),

            // Other
            'how_found_us' => fake()->optional()->randomElement([
                'Google', 'Facebook', 'Referral', 'Flyer', 'Word of mouth',
            ]),
            'additional_info' => fake()->optional()->paragraph(),
            'status' => 'new',
        ];
    }

    public function read(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'read']);
    }

    public function replied(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'replied']);
    }
}
