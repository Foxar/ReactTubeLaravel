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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */




    public function index()
    {
        //
        $videos = Video::all()->take(5);
        return $videos;
    }

    public function find(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Hello from ");
        //$out->writeln($request->search);

        $videos = Video::where('name', 'LIKE', '%'.$request->search.'%')->take(5)->get();
        return $videos->toArray();
    }

    public function edit(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Editing video " . $request->videoid);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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

    public function storeFile(Request $request)
    {

        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Storing file");
        $videofile = $request->file('file');

        

        $out->writeln('File Name: '.$videofile->getClientOriginalName());
        $out->writeln('File format: '.$videofile->getClientOriginalExtension());

        $path = public_path().'\react-tube-app\public\videos\\';
        $filename = $request->videoid.'_original.'.$videofile->getClientOriginalExtension();

        $out->writeln('Storing at Path: '.$path);
        $out->writeln('With filename: '.$filename);
        $videofile->move($path,$filename);

        $out->writeln('Stored!');
        
        //$filesystem = new Filesystem();
        try {
        
            $out->writeln('Converting...');
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
            $out->writeln('Converted!');
            $out->writeln('Generating thumbnail...');
            FFMpeg::fromDisk('videos')
                ->open($filename)
                ->getFrameFromSeconds(1)
                ->export()
                ->save($request->videoid.'.png');
                $out->writeln('Generated!');
        } catch (EncodingException $exception)
        {
            $command = $exception->getCommand();
            $errorLog = $exception->getErrorOutput();
            $out->writeln($command);
            $out->writeln($errorLog);
        }
        $out->writeln('Done!');
        return response()->json(['message'=>'Video processing finished!', ],200);



    }

    public function like(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Liking a video");
        //$user = User::all()->find($request->userid);
        $user = Auth::user();
        $out->writeln("ID:");
        $out->writeln(Auth::user()->id);
        
        $vid = Video::all()->find($request->videoid);
        $out->writeln("User: " . $user->id . " videoid: " . $vid->id);

        if($vid->likedBy()->save($user))
        {
            $out->writeln("Success!");
            return response()->json(['message'=>'Liked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

            $out->writeln("Error!");
        return response()->json(['message'=>'Failed to like!', 'user'=>$user, 'video'=>$vid],400);

    }

    public function unlike(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Liking a video");
        //$user = User::all()->find($request->userid);
        $user = Auth::user();
        
        $vid = Video::all()->find($request->videoid);
        $out->writeln("User: " . $user->id . " videoid: " . $vid->id);

        if($vid->likedBy()->save($user))
        {
            $out->writeln("Success!");
            return response()->json(['message'=>'Liked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

            $out->writeln("Error!");
        return response()->json(['message'=>'Failed to like!', 'user'=>$user, 'video'=>$vid],400);

    }



    public function dislike(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Disliking a video");
        $user = Auth::user();
        
        $vid = Video::all()->find($request->videoid);
        $out->writeln("User: " . $user->id . " videoid: " . $vid->id);

        if($vid->dislikedBy()->save($user))
        {
            $out->writeln("Success!");
            return response()->json(['message'=>'Disliked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

            $out->writeln("Error!");
        return response()->json(['message'=>'Failed to dislike!', 'user'=>$user, 'video'=>$vid],400);

    }


    public function undislike(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Disliking a video");
        $user = Auth::user();
        
        $vid = Video::all()->find($request->videoid);
        $out->writeln("User: " . $user->id . " videoid: " . $vid->id);

        if($vid->dislikedBy()->save($user))
        {
            $out->writeln("Success!");
            return response()->json(['message'=>'Disliked successfuly!', 'user'=>$user, 'video'=>$vid],200);
        }

            $out->writeln("Error!");
        return response()->json(['message'=>'Failed to dislike!', 'user'=>$user, 'video'=>$vid],400);

    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    { 
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Show");
        $out->writeln($request);

        

        $vid = Video::all()->find($request->id);

        $vid->views = $vid->views+1;
        $vid->save();

        $videofilePath=public_path().'\react-tube-app\public\videos\\'.$vid->id.'.webm';
        if(file_exists($videofilePath))
        {
            $out->writeln("Videofile exists at " . $videofilePath);
        }
        else
        {
            $out->writeln("Videofile DOES NOT exists at " . $videofilePath);
            

            return response()->json('Videofile does not exist!',404);    
        }

        $out->writeln($vid->name);
        $path = 'http://localhost:8000/react-tube-app/public/videos/'.$vid->id.'.webm';
        $pathThumb = 'http://localhost:8000/react-tube-app/public/videos/'.$vid->id.'.png';


        $out->writeln("Comments");
        $out->writeln($vid->comments->take(5));
        $comments = $vid->comments->take(5);

        for($i=0; $i<count($comments); $i++){
            $out->writeln("Comment");

            $out->writeln($comments[$i]);
            $out->writeln("User");
            $user = $comments[$i]->User;
            $out->writeln($user->name);
            $comments[$i]->author = $comments[$i]->User->name;

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
            
        $out->writeln($vid->likes);
        $out->writeln($vid->dislikes);
        $out->writeln(gettype($vid->likedby));
        $out->writeln($vid->likedby);
        $likesCount = $vid->likedby->count();
        $dislikesCount = $vid->dislikedby->count();
        $out->writeln($likesCount);
        $out->writeln($dislikesCount);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        //
    }
}
