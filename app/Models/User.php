<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'description',
        'views',

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'user_joined' => 'datetime'
    ];

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function likedVideos()
    {
        return $this->belongsToMany(Video::class);
    }

    public function dislikedVideos()
    {
        return $this->belongsToMany(Video::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
}
