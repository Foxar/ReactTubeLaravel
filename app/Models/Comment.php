<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'content',
    ];

    protected $casts = [
        'video_uploaded' => 'datetime'
    ];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function Video(){
        return $this->belongsTo(Video::class, 'video_id');
    }
}
