<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\CommentController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/logout', [UserController::class, 'logout'])
->name('logout');
    
Route::post('/register', [UserController::class, 'store'])
->name('register');

Route::post('/edituser', [UserController::class, 'edit'])
->name('edit')->middleware('auth');

Route::get('/currentuser', [UserController::class, 'show'])
->name('currentuser')->middleware('auth');

Route::post('/deletevideo', [VideoController::class, 'delete'])
->name('deletevideo')->middleware('auth');

//add middleware auth later here
Route::post('/uploadvideo', [VideoController::class, 'store'])
->name('uploadvideo');

//here too
Route::post('/editvideo', [VideoController::class, 'edit'])
->name('edit');

Route::post('/uploadvideofile', [VideoController::class, 'storeFile'])
->name('uploadvideofile');

Route::get('/getuservideos', [UserController::class, 'getuservideos'])
->name('getuservideos');

Route::get('/getuserrecentvideos', [UserController::class, 'getuserrecentvideos'])
->name('getuserrecentvideos');

Route::get('/random5videos', [VideoController::class, 'index'])
->name('random5videos');

Route::get('/video', [VideoController::class, 'show'])
->name('show');

Route::post('/newcomment', [CommentController::class, 'store'])
->name('store');

Route::get('/profilevideos', [VideoController::class, 'index'])
->name('videos');

Route::get('/find', [VideoController::class, 'find'])
->name('find');

Route::get('/profile', [UserController::class, 'getprofile'])
->name('getprofile');

Route::get('/like', [VideoController::class, 'like'])
->name('like')->middleware('auth');

Route::get('/unlike', [VideoController::class, 'unlike'])
->name('unlike')->middleware('auth');

Route::get('/dislike', [VideoController::class, 'dislike'])
->name('dislike')->middleware('auth');

Route::get('/undislike', [VideoController::class, 'undislike'])
    ->name('undislike')->middleware('auth');


