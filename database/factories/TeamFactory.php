<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'position' => fake()->randomElement([
                'Registered Nurse',
                'Caregiver',
                'Physical Therapist',
                'Nutritionist',
                'Social Worker',
                'Facility Administrator',
                'Medical Director',
            ]),
            'bio' => fake()->optional()->paragraph(),
            'photo' => null,
            'order' => fake()->numberBetween(0, 20),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => ['is_active' => false]);
    }
}
