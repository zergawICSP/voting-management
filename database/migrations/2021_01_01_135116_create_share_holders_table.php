<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShareHoldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('share_holders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('no_of_shares');
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('subcity')->nullable();
            $table->string('woreda/kebele')->nullable();
            $table->boolean('is_present')->default(false);
            $table->timestamp('attended_time')->nullable();
            $table->foreignId('delegate_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('barcode')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('share_holders');
    }
}
