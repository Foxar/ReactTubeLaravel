<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideoDislikedbyUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_dislikedby_user', function (Blueprint $table) {
            $table->primary(['user_id','video_id']);
            $table->timestamps();
            $table->integer('user_id')->unsigned();
            $table->integer('video_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
             $table->foreign('video_id')
                ->references('id')
                ->on('videos');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('video_dislikedby_user');
    }
}
