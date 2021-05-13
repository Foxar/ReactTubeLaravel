import VideoStub from '../VideoPage/VideoStub'

function VideoEditStub(props) {
    let v = props.v;

    console.log("VideoEditStub");
    console.log(props);
    console.log("v");
    console.log(v);
    console.log(props.v);
    return <VideoStub url={"/editvideo/" + v.id} title={v.name} views={v.views} channel={v.AuthorName} thumbUrl={"http://localhost:8000/videos/" + v.id + ".png"} />
}
export default VideoEditStub;