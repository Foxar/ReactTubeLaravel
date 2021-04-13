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
    //Create a new user with given attributes.
    public function store(Request $request)
    {

        //Check for data requirements.
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        
        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors(),'data'=>$request->all()], 500);
        }

        //Create the user in database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
			'role' => $request->role,
            'views' => 0,
            'created_at' => now(),
            'password' => Hash::make($request->password),
        ]);
        //Returns 422 on fail
        return $user;
    }

    //Get videos uploaded by the user.
    public function getUserVideos(Request $request)
    {
        $user = User::find($request->userid);
        return $user->videos;
    }

    //Get videos recently uploaded by the user.
    public function getUserRecentVideos(Request $request)
    {
        $user = User::find($request->userid);
        //Temporarily gets all videos, change later
        return $user->videos;
    }


    //Handle logging in of a user
    public function authenticate(Request $request)
    {
        //Retrieve email and password pair from the request.
        $credentials = $request->only('email', 'password');

        //Attempt to auth with the email password credentials pair.
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Auth::user();
        }

        //Return error message if logging in fails.
        return response()->json([
            'error' => 'The provided credentials do not match our records.',
        ],401);
    }

    //Handle logging out of a user.
    public function logout(Request $request)
    {
        Auth::logout();
        return response('Logged out', 200);
    }
    
    //Retrieve current user's ID.
    public function show(User $user)
    {
        return response()->json(["id"=>Auth::id()]);
    }

    //Retrieve user profile's information.
    public function getprofile(Request $request)
    {

        //Find user by id
        $user = User::find($request->id);
        //Find user's videos
        $videos = $user->videos;
        
        //Retrieve user's account creation date and the format it appropriately.
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

    //Edit user's account
    public function edit(Request $request)
    {
        //Find user by ID.
        $user = User::find(Auth::id());
        
        //Check if user uploaded a new profile picture. If yes, store it.
        $avatarfile = $request->file('file');
        if($avatarfile != null){
            $path = public_path().'\react-tube-app\public\avatars\\';
            $filename = Auth::id().'.png';
            $avatarfile->move($path,$filename);
        }

        //Check if the name or profile description fields have been edited. If so, submit the changes to database.
        if($request->filled('name'))
            $user->name = $request->name;
        if($request->filled('desc'))
            $user->description = $request->desc;
        $user->save();
        return response($user, 200);
    }

    //TO-DO: Destroying of resource.
}
