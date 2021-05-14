<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use App\Models\Video;
use FFMpeg;

class ProcessVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $video;
    protected $extension;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Video $video, $extension)
    {
        $this->video = $video;
        $this->extension = $extension;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $filename = $this->video->id.'_original.'.$this->extension;
        //Process the video
        try {
            //Convert the videofile to webm file format.
            FFMpeg::fromDisk('videos')
                ->open($filename)
                ->export()
                ->toDisk('videos')
                ->inFormat(new \FFMpeg\Format\Video\WebM)
                ->save($this->video->id . '.webm');        

            //Generate a thumbnail
            FFMpeg::fromDisk('videos')
                ->open($filename)
                ->getFrameFromSeconds(1)
                ->export()
                ->save($this->video->id.'.png');
            
            //Update fileprocessed column to confirm video processed.
            $video = Video::all()->find($this->video->id);
            $video->fileprocessed = true;
            $video->save();
        } catch (EncodingException $exception)
        {
            //Catch any errors and output them to console.
            $command = $exception->getCommand();
            $errorLog = $exception->getErrorOutput();
        }
    }
}
