import '../../App.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { IconButton, TextField, Avatar } from '@material-ui/core';
import VideoInfoDescription from './VideoInfoDescription';

function RelatedVideo(props) {
    console.log("Related:");
    console.log(props);
    if (props.url == null || props.title == null || props.views == null)
        return (
            <div className="relatedVideo">
                Error displaying video!
            </div>
        );
    else
        return (
            <div className="relatedVideo">
                <a href={props.url}><img className="relatedThumb" src={props.thumbUrl} /></a>
                <div className="relatedVideoInfo">
                    <h4>{props.title}</h4>
                    <p>{props.channel}</p>
                    <p>{props.views} views</p>
                </div>
            </div>
        );

}

export default RelatedVideo;
