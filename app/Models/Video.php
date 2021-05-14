<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'likes',
        'dislikes',
        'views',
        'fileprocessed'
    ];

    protected $casts = [
        'video_uploaded' => 'datetime'
    ];


    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likedBy()
    {
        return $this->belongsToMany(User::class, 'video_likedby_user');
    }

    public function dislikedBy()
    {
        return $this->belongsToMany(User::class, 'video_dislikedby_user');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
