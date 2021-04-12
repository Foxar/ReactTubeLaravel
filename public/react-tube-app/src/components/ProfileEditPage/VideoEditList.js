import VideoEditStub from './VideoEditStub'

function VideoEditList(props) {
    return (
        <div className="videoEditList">
            {
                props.videos.map(function (v, index) {
                    console.log(v);
                    return <VideoEditStub v={v} />;
                })
            }
        </div>
    );
}

export default VideoEditList;
