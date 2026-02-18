<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    /** @use HasFactory<\Database\Factories\TestimonialFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'relation',
        'content',
        'rating',
        'status',
    ];

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
