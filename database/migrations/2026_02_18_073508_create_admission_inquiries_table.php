<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_inquiries', function (Blueprint $table) {
            $table->id();

            // --- Inquirer Info (Fields 1–7) ---
            $table->string('title')->nullable();                  // Mr., Mrs., Ms.
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('preferred_contact')->nullable();      // Email, Phone, Text, Messenger, Other

            // --- Prospective Resident Info (Fields 8–12) ---
            $table->string('resident_name');
            $table->string('resident_gender')->nullable();        // Female, Male, Other
            $table->string('resident_address')->nullable();
            $table->date('resident_date_of_birth')->nullable();
            $table->string('relationship')->nullable();           // Mother, Father, Spouse, etc.

            // --- Care Needs (Fields 13–19) ---
            $table->string('care_service')->nullable();           // Assisted Living, Memory Care, etc.
            $table->json('medical_conditions')->nullable();       // checkboxes → array
            $table->text('special_needs')->nullable();
            $table->boolean('needs_walking_assistance')->nullable();
            $table->boolean('is_wheelchair_bound')->nullable();
            $table->boolean('needs_bathing_assistance')->nullable();
            $table->string('has_feeding_tube')->nullable();       // Yes, No, Sometimes

            // --- Scheduling (Fields 20–22) ---
            $table->string('move_in_timeline')->nullable();       // Immediately, Within 1–2 weeks, etc.
            $table->date('preferred_tour_date')->nullable();
            $table->time('preferred_tour_time')->nullable();

            // --- Other (Fields 23–24) ---
            $table->string('how_found_us')->nullable();
            $table->text('additional_info')->nullable();

            $table->string('status')->default('new');             // new, read, replied
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_inquiries');
    }
};
