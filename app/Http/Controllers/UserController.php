<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;




class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        
        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors(),'data'=>$request->all()], 500);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
			'role' => $request->role,
            'views' => 0,
            'created_at' => now(),
            'password' => Hash::make($request->password),
        ]);
        //Auth::login();
        //Returns 422 on fail
        return $user;



    }

    public function getUserVideos(Request $request)
    {
        $user = User::find($request->userid);
        return $user->videos;
    }

    public function getUserRecentVideos(Request $request)
    {
        $user = User::find($request->userid);
        //Temporarily gets all videos, change later
        return $user->videos;
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Attempting to auth");
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            $out->writeln("Success");
            return Auth::user();
        }

        
        $out->writeln("Failed");
        
        return response()->json([
            'error' => 'The provided credentials do not match our records.',
        ],401);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return response('Logged out', 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        
        return response()->json(["id"=>Auth::id()]);
    }

    public function getprofile(Request $request)
    {
        $user = User::find($request->id);
        $videos = $user->videos;

        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Show");
        foreach($videos as $video){
            $out->writeln($video->name);
        }
        $out->writeln("Show");
        
        $carbonObj = Carbon::parse($user->user_joined);
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

        return response()->json([
            "name"=>$user->name,
            "videos"=>$videos,
            "joined"=>$uploadedDateTime,
            "desc"=>$user->description,
            "views"=>$user->views,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $user = User::find(Auth::id());

        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln($user);
        $out->writeln($request);


        $out->writeln("Checking for avatar file");
        $avatarfile = $request->file('file');
        if($avatarfile != null){
            $out->writeln("Storing file");
            

            $out->writeln('File Name: '.$avatarfile->getClientOriginalName());
            $out->writeln('File format: '.$avatarfile->getClientOriginalExtension());

            $path = public_path().'\react-tube-app\public\avatars\\';
            $filename = Auth::id().'.png';

            $out->writeln('Storing at Path: '.$path);
            $out->writeln('With filename: '.$filename);
            $avatarfile->move($path,$filename);

            $out->writeln('Stored!');
        }

        
        if($request->filled('name'))
            $user->name = $request->name;
        if($request->filled('desc'))
            $user->description = $request->desc;
        $user->save();
        return response($user, 200);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
