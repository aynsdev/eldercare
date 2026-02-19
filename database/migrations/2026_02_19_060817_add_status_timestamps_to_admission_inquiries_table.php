<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('admission_inquiries', function (Blueprint $table) {
            $table->timestamp('read_at')->nullable()->after('status');
            $table->timestamp('in_progress_at')->nullable()->after('read_at');
            $table->timestamp('tour_scheduled_at')->nullable()->after('in_progress_at');
            $table->timestamp('admitted_at')->nullable()->after('tour_scheduled_at');
            $table->timestamp('declined_at')->nullable()->after('admitted_at');
            $table->timestamp('closed_at')->nullable()->after('declined_at');
        });
    }

    public function down(): void
    {
        Schema::table('admission_inquiries', function (Blueprint $table) {
            $table->dropColumn(['read_at', 'in_progress_at', 'tour_scheduled_at', 'admitted_at', 'declined_at', 'closed_at']);
        });
    }
};
