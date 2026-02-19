<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    /** @use HasFactory<\Database\Factories\InquiryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'preferred_contact',
        'message',
        'status',
        'read_at',
        'replied_at',
        'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
            'replied_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }
}
