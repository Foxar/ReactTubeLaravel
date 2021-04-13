<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
    //Create new comment, with attributes given in the request.
    public function store(Request $request)
    {
        $comment = new Comment;
        $comment->content = $request->content;
        $comment->Video()->associate($request->videoid);
        $comment->User()->associate(Auth::user());
        $comment->save();
        return $comment;
    }
    //Todo: Updating, Deleting resource.
}
