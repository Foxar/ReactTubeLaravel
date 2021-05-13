<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Filesystem\Filesystem;
use Carbon\Carbon;

use FFMpeg;


class VideoController extends Controller
{
    //Return a list of five videos taken from the database.
    public function index()
    {
        $videos = Video::all()->take(5);
        return $videos;
    }

    //Return array of videos where name matches the search parameter of the request.
    public function find(Request $request)
    {
        $videos = Video::where('name', 'LIKE', '%'.$request->search.'%')->take(5)->get();
        return $videos->toArray();
    }

    //Find video by id then edit it's title or description, whichever is provided.
    public function edit(Request $request)
    {
        $vid = Video::all()->find($request->videoid);
        if($request->filled('name')) {
            $vid->name = $request->name;
        }
        if($request->filled('desc')) {
            $vid->description = $request->desc;
        }
        $vid->save();
        return $vid;
    }

    //Create a new video in the database, with data given by the request.
    public function store(Request $request)
    {
        $video = new Video;
        $video->name = $request->name;
        $video->description = $request->desc;
        $video->likes=0;
        $video->dislikes=0;
        $video->views=0;
        $video->video_uploaded = now();
        $video->User()->associate(Auth::user());
        $video->save();
        return $video;
    }

    //Store and process the video file given in the request.
    public function storeFile(Request $request)
    {

        //Store the uploaded video file in the public directory.
        $videofile = $request->file('file');
        $path = public_path().'\react-tube-app\public\videos\\';
        //Rename the videofile to add _original suffix.
        $filename = $request->videoid.'_original.'.$videofile->getClientOriginalExtension();
        $videofile->move($path,$filename);


        //Processing the videofile using FFMpeg pipeline
        try {
            //Convert the videofile to webm file format.
            FFMpeg::fromDisk('videos')
                ->open($filename)
                ->export()
                ->onProgress(function ($percentage) {
                    $out = new \Symfony\Component\Console\Output\ConsoleOutput();
                    $out->writeln($percentage . '% transcoded');
                })
                ->toDisk('videos')
                ->inFormat(new \FFMpeg\Format\Video\WebM)
                ->save($request->videoid . '.webm');        
            //Generate a thumbnail
            FFMpeg::fromDisk('videos')
                ->open($filename)
                ->getFrameFromSeconds(1)
                ->export()
                ->save($request->videoid.'.png');
                $out->writeln('Generated!');
        } catch (EncodingException $exception)
        {
            //Catch any errors and output them to console.
            $command = $exception->getCommand();
            $errorLog = $exception->getErrorOutput();
            $out->writeln($command);
            $out->writeln($errorLog);
        }
        return response()->json(['message'=>'Video processing finished!', ],200);
    }
    //Handle liking of a video
    public function like(Request $request)
    {
        //Get the current user
        $user = Auth::user();
        $vid = Video::all()->find($request->videoid);
        //Attempt to like the video by current user
        if($vid->likedBy()->save($user))
        {
            return response()->json(['message'=>'Liked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }
        return response()->json(['message'=>'Failed to like!', 'user'=>$user, 'video'=>$vid],400);

    }
    //Handle unliking of a video
    public function unlike(Request $request)
    {
        //Get the current user
        $user = Auth::user();
        $vid = Video::all()->find($request->videoid);
        //Attempt to unlike the video by the current user --UNFINISHED, PLACEHOLDER CODE
        if($vid->likedBy()->save($user))
        {
            return response()->json(['message'=>'Liked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }
        return response()->json(['message'=>'Failed to like!', 'user'=>$user, 'video'=>$vid],400);

    }

    //Handle disliking of a video
    public function dislike(Request $request)
    {
        //Get the current user
        $user = Auth::user();
        $vid = Video::all()->find($request->videoid);
        //Attempt to dislike the video by current user
        if($vid->dislikedBy()->save($user))
        {
            return response()->json(['message'=>'Disliked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

        return response()->json(['message'=>'Failed to dislike!', 'user'=>$user, 'video'=>$vid],400);

    }

    //Handle undisliking of a video
    public function undislike(Request $request)
    {
        //Get the current user
        $user = Auth::user();
        $vid = Video::all()->find($request->videoid);
        //Attempt to undislike the video by the current user --UNFINISHED, PLACEHOLDER CODE
        if($vid->dislikedBy()->save($user))
        {
            $out->writeln("Success!");
            return response()->json(['message'=>'Disliked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

            $out->writeln("Error!");
        return response()->json(['message'=>'Failed to dislike!', 'user'=>$user, 'video'=>$vid],400);

    }

    //Return given video attributes (User viewing)
    public function show(Request $request)
    { 
        //Find video by id
        $vid = Video::all()->find($request->id);

        //Increase video views
        $vid->views = $vid->views+1;
        $vid->save();


        $videofilePath=public_path().'\videos\\'.$vid->id.'.webm';
        if(!file_exists($videofilePath))
        {
            $out->writeln("Videofile DOES NOT exists at " . $videofilePath);
            return response()->json('Videofile does not exist!',404);    
        }

        $path = 'http://localhost:8000/videos/'.$vid->id.'.webm';
        $pathThumb = 'http://localhost:8000/videos/'.$vid->id.'.png';

        //Retrieve 5 comments from the video.
        $comments = $vid->comments->take(5);

        for($i=0; $i<count($comments); $i++){
            //Acquire comment author's name
            $user = $comments[$i]->User;
            $comments[$i]->author = $comments[$i]->User->name;

            //Acquire comment creation date, then format it appropriately
            if($comments[$i]->created_at != null){
                $carbonCommentsObj = Carbon::parse($comments[$i]->created_at);
                $commentDateTime = [
                "date" => [
                    "year" => $carbonCommentsObj->year,
                    "month" => $carbonCommentsObj->shortEnglishMonth,
                    "day"=> $carbonCommentsObj->day,
                ],
                "time" => [
                    "hour" => $carbonCommentsObj->hour,
                    "minute" => $carbonCommentsObj->minute,
                    "second" => $carbonCommentsObj->second,
                ]
    
                ];
                $comments[$i]->postDate = $commentDateTime;
            }
            else 
                $comments[$i]->postDate = "";
        }
        //Retrieve likes and dilikes counts
        $likesCount = $vid->likedby->count();
        $dislikesCount = $vid->dislikedby->count();

        //Retrieve video creation date, then format it appropriately
        $carbonObj = Carbon::parse($vid->video_uploaded);
        $uploadedDateTime = [
            "date" => [
                "year" => $carbonObj->year,
                "month" => $carbonObj->shortEnglishMonth,
                "day"=> $carbonObj->day,
            ],
            "time" => [
                "hour" => $carbonObj->hour,
                "minute" => $carbonObj->minute,
                "second" => $carbonObj->second,
            ]

            ];
            $liked = 0;
            $disliked = 0;

            //RAN INTO ISSUES WITH GETTING AUTHENTICATED USER ON A NON-AUTH MIDDLEWARE ROUTE
            /*
            
            if(Auth::check())
            $out->writeln("Authenticateddddddddd");
        else
            $out->writeln("Unauthenticateddddddd");
        
        $out->writeln("Auth");
        $user = auth('web')->user();


        $out->writeln($user);

        foreach($vid->likedby as $likedby)
        {
            $out->writeln("Likedby:");
            $out->writeln($likedby->id);
            $out->writeln($likedby);
            if($likedby->id == $user->id)
            {
                $out->writeln("Liked by current user");
                $liked = 1;
                break;
            }
        }
        $liked = $vid->likedby->where('user_id', Auth::id());
        $disliked = $vid->dislikedby->where('user_id', Auth::id());
*/
        return response()->json([
            'thumbnailPath'=>$pathThumb,
            'path'=>$path,
            'name'=>$vid->name,
            'desc'=>$vid->description,
            'user'=>$vid->User->name,
            'userid'=>$vid->User->id,
            'views'=>$vid->views,
            'likes'=>$likesCount,
            'liked'=>$liked,
            'disliked'=>$disliked,
            'dislikes'=>$dislikesCount,
            'comments'=>$comments,
            'uploaded'=>$uploadedDateTime,
        ],200);



    }


    //To-add: Deleting resource.
}
