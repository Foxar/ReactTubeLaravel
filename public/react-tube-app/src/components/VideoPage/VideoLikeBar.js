import '../../App.css';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { IconButton } from '@material-ui/core';

import axiosCsrf from '../Axios/axios.js';
import axios from "axios";

function VideoLikeBar(props) {

    let width = props.likeratio + '%';

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
                <IconButton className="likebutton" color="secondary" onClick={() => {
                    axiosCsrf.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).
                        then((data) => {
                            console.log(data);
                            axios.get('http://localhost:8000/like?videoid=' + props.videoid, { withCredentials: true })
                                .then((data) => {
                                    console.log(data);
                                    props.likeCallback();
                                });
                        });
                }}>
                    <ThumbUpIcon />
                    {props.likes}
                </IconButton>
                <IconButton className="dislikebutton" color="secondary" onClick={() => {
                    axiosCsrf.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).
                        then((data) => {
                            console.log(data);
                            axios.get('http://localhost:8000/dislike?videoid=' + props.videoid, { withCredentials: true })
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