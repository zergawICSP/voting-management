<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DelegateMeetingAgenda extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delegate_meeting_agenda', function (Blueprint $table) {
            $table->foreignId('delegate_id')->constrained()->onDelete('cascade');
            $table->foreignId('meeting_agenda_id')->constrained()->onDelete('cascade');
            $table->string('answer')->default('እደግፋለሁ');
            $table->unsignedBigInteger('user_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('delegate_meeting_agenda');
    }
}
