<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->timestamp('read_at')->nullable()->after('status');
            $table->timestamp('replied_at')->nullable()->after('read_at');
            $table->timestamp('closed_at')->nullable()->after('replied_at');
        });
    }

    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn(['read_at', 'replied_at', 'closed_at']);
        });
    }
};
