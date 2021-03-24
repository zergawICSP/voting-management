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
            $table->integer('subscribed_shares');
            $table->integer('paidup_shares');
            $table->float('total_share_value')->nullable();
            $table->float('total_paidup_share_value')->nullable();
            $table->float('service_charge')->nullable();
            $table->string('service_charge_transaction')->nullable();
            $table->string('nationality');
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('subcity')->nullable();
            $table->string('woreda_kebele')->nullable();
            $table->string('bank_name');
            $table->string('gender')->nullable();
            $table->softDeletes();
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
