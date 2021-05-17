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
        //Multiple qualities x264 formats
        $format_hq = new \FFMpeg\Format\Video\X264();
        $format_mq = new \FFMpeg\Format\Video\X264();
        $format_lq = new \FFMpeg\Format\Video\X264();

        $format_mq->setKiloBitrate(500);
        $format_lq->setKiloBitrate(150);

        $filename = $this->video->id.'_original.'.$this->extension;
        
        Log::info("Converting video ".$filename);
        //Process the video
        try {
            //Convert the videofile to webm file format.
            FFMpeg::fromDisk('videos')
                ->open($filename)
                //Convert to high quality
                ->export()
                ->toDisk('videos')
                ->inFormat($format_hq)
                ->save($this->video->id . '_hq.mkv')

                //Convert to medium quality
                ->export()
                ->toDisk('videos')
                ->inFormat($format_mq)
                ->save($this->video->id . '_mq.mkv')

                //Convert to low quality
                ->export()
                ->toDisk('videos')
                ->inFormat($format_lq)
                ->save($this->video->id . '_lq.mkv');        

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
            Log::error("Error converting ".$filename);
            //Catch any errors and output them to console.
            $command = $exception->getCommand();
            $errorLog = $exception->getErrorOutput();
        }
        Log::info("Done converting.");
    }
}
