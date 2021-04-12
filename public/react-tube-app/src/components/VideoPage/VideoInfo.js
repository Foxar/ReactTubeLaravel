import '../../App.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { IconButton, TextField, Avatar } from '@material-ui/core';
import VideoInfoDescription from './VideoInfoDescription';
import VideoLikeBar from './VideoLikeBar';


function VideoInfo(props) {
    const width = props.width;
    const likeratio = props.likeratio;
    console.log("props");
    console.log(props);
    console.log("width");
    console.log(width);
    console.log("Like ratio: " + likeratio);
    console.log(props.date);



    return (
        <div className="videoInfo">
            <h1>{props.name}</h1>
            <p>{props.views} views</p>
            <VideoLikeBar videoid={props.videoid} likeratio={likeratio}
                likes={props.likes} dislikes={props.dislikes}
                likeCallback={props.likeCallback} dislikeCallback={props.dislikeCallback} />
            <h5>{props.date.date.day + " " + props.date.date.month + " " + props.date.date.year}</h5>
            <hr />
            <div className="uploaderInfo">
                <a href={"/profile/" + props.authorid}>
                    <Avatar src={"/avatars/" + props.authorid + ".png"} ></Avatar>

                    <h4>{props.author}</h4>
                </a>
            </div>
            <VideoInfoDescription width={props.width} desc={props.desc} />
        </div>
    );
}

export default VideoInfo;
