<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->integer('likes');
            $table->integer('dislikes');
            $table->integer('views');
            $table->integer('user_id')->unsigned();
            $table->timestamp('video_uploaded');
            $table->boolean('fileprocessed');
            $table->timestamps();
        });

        Schema::table('videos', function(Blueprint $table) {
            $table->string('description')->nullable()->change();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
