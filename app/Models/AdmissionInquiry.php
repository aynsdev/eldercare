<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionInquiry extends Model
{
    /** @use HasFactory<\Database\Factories\AdmissionInquiryFactory> */
    use HasFactory;

    protected $fillable = [
        // Inquirer
        'title',
        'first_name',
        'last_name',
        'address',
        'phone',
        'email',
        'preferred_contact',

        // Prospective resident
        'resident_name',
        'resident_gender',
        'resident_address',
        'resident_date_of_birth',
        'relationship',

        // Care needs
        'care_service',
        'medical_conditions',
        'special_needs',
        'needs_walking_assistance',
        'is_wheelchair_bound',
        'needs_bathing_assistance',
        'has_feeding_tube',

        // Scheduling
        'move_in_timeline',
        'preferred_tour_date',
        'preferred_tour_time',

        // Other
        'how_found_us',
        'additional_info',
        'status',
        'read_at',
        'in_progress_at',
        'tour_scheduled_at',
        'admitted_at',
        'declined_at',
        'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'medical_conditions' => 'array',
            'resident_date_of_birth' => 'date',
            'preferred_tour_date' => 'date',
            'needs_walking_assistance' => 'boolean',
            'is_wheelchair_bound' => 'boolean',
            'needs_bathing_assistance' => 'boolean',
            'read_at' => 'datetime',
            'in_progress_at' => 'datetime',
            'tour_scheduled_at' => 'datetime',
            'admitted_at' => 'datetime',
            'declined_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /** Full name of the inquirer. */
    public function getFullNameAttribute(): string
    {
        return trim("{$this->title} {$this->first_name} {$this->last_name}");
    }
}
