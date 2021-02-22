<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MeetingAgendaShareholder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_agenda_share_holder', function (Blueprint $table) {
            $table->foreignId('meeting_agenda_id')->constrained()->onDelete('cascade');
            $table->foreignId('share_holder_id')->constrained()->onDelete('cascade');
            $table->string('answer');
            $table->unsignedBigInteger('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_agenda_share_holder');
    }
}
