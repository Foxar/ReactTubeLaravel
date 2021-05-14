import '../../App.css';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { IconButton } from '@material-ui/core';

import axiosCsrf from '../Axios/axios.js';
import axios from "axios";

function VideoLikeBar(props) {

    console.log("VideoLikeBar");
    console.log(props);
    let width = props.likeratio + '%';
    let likedColor = (props.liked == 0) ? "secondary" : "default";
    let dislikedColor = (props.disliked == 0) ? "secondary" : "default";
    console.log(likedColor);
    console.log(dislikedColor);

    return (
        <div className="videoLikeDislikeContainer" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingRight: '15em'
        }} >

            <div className="videoLikeDislikeBarContainer" style={{

            }}>

                <div className="videoLikeDislikeBar" style={{
                    backgroundColor: 'red',
                    width: '200px',
                    height: '5px',
                }}  >
                    <div className="videoLikeBar" style={{
                        backgroundColor: 'green',
                        width: width,
                        height: '100%',
                    }}  ></div>
                </div >
                <IconButton className="likebutton" color={likedColor} onClick={() => {
                    axiosCsrf.get('http://localhost:8000/api/sanctum/csrf-cookie', { withCredentials: true }).
                        then((data) => {
                            console.log(data);
                            axios.get('http://localhost:8000/api/like?videoid=' + props.videoid, { withCredentials: true })
                                .then((data) => {
                                    console.log(data);
                                    props.likeCallback();
                                });
                        });
                }}>
                    <ThumbUpIcon />
                    {props.likes}
                </IconButton>
                <IconButton className="dislikebutton" color={dislikedColor} onClick={() => {
                    axiosCsrf.get('http://localhost:8000/api/sanctum/csrf-cookie', { withCredentials: true }).
                        then((data) => {
                            console.log(data);
                            axios.get('http://localhost:8000/api/dislike?videoid=' + props.videoid, { withCredentials: true })
                                .then((data) => {
                                    console.log(data);
                                    props.dislikeCallback();
                                });
                        });
                }}>

                    <ThumbDownIcon />
                    {props.dislikes}
                </IconButton>
            </div>

        </div>
    );
}

export default VideoLikeBar;
