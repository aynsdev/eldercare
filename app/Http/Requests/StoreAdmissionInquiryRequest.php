<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdmissionInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        // Convert 'yes'/'no' radio strings to booleans for nullable boolean columns
        $booleanFields = ['needs_walking_assistance', 'is_wheelchair_bound', 'needs_bathing_assistance'];

        $conversions = [];
        foreach ($booleanFields as $field) {
            $value = $this->input($field);
            $conversions[$field] = match ($value) {
                'Yes' => true,
                'No' => false,
                default => null,
            };
        }

        $this->merge($conversions);
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            // Inquirer
            'title' => ['nullable', 'string', 'in:Mr.,Mrs.,Ms.'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'preferred_contact' => ['nullable', 'string', 'in:Email,Phone,Text,Messenger,Other'],

            // Resident
            'resident_name' => ['required', 'string', 'max:255'],
            'resident_gender' => ['nullable', 'string', 'in:Female,Male,Other'],
            'resident_address' => ['nullable', 'string', 'max:255'],
            'resident_date_of_birth' => ['nullable', 'date', 'before:today'],
            'relationship' => ['required', 'string', 'max:255'],

            // Care needs
            'care_service' => ['nullable', 'string', 'max:255'],
            'medical_conditions' => ['required', 'array', 'min:1'],
            'medical_conditions.*' => ['string'],
            'special_needs' => ['nullable', 'string', 'max:2000'],
            'needs_walking_assistance' => ['nullable', 'boolean'],
            'is_wheelchair_bound' => ['nullable', 'boolean'],
            'needs_bathing_assistance' => ['nullable', 'boolean'],
            'has_feeding_tube' => ['nullable', 'string', 'in:Yes,No,Sometimes'],

            // Scheduling
            'move_in_timeline' => ['nullable', 'string', 'max:255'],
            'preferred_tour_date' => ['nullable', 'date', 'after:today'],
            'preferred_tour_time' => ['nullable', 'date_format:H:i'],

            // Other
            'how_found_us' => ['nullable', 'string', 'max:255'],
            'additional_info' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'first_name.required' => 'Please enter your first name.',
            'last_name.required' => 'Please enter your last name.',
            'resident_name.required' => 'Please enter the full name of the prospective resident.',
            'relationship.required' => 'Please select your relationship to the resident.',
            'medical_conditions.required' => 'Please select at least one medical condition.',
            'medical_conditions.min' => 'Please select at least one medical condition.',
            'preferred_tour_date.after' => 'Tour date must be a future date.',
            'resident_date_of_birth.before' => 'Date of birth must be in the past.',
        ];
    }
}
