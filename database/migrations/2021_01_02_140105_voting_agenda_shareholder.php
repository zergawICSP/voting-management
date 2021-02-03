<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VotingAgendaShareholder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('voting_agenda_shareholder', function (Blueprint $table) {
            $table->foreignId('voting_agenda_id')->constrained()->onDelete('cascade');
            $table->foreignId('share_holder_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('voting_agenda_shareholder');
    }
}
