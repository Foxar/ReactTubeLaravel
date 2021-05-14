import '../../App.css'
import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { withRouter } from "react-router";
import VideoInfo from './VideoInfo';
import RelatedVideosSection from './RelatedVideosSection';
import { CircularProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import VideoNotFound from './VideoNotFound';
import axios from 'axios';
import {
    Redirect
} from "react-router-dom";
import CommentSection from './Comments/CommentSection';



class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: 1280,
            loading: false
        }
        this.likeCallback = this.likeCallback.bind(this);
        this.dislikeCallback = this.dislikeCallback.bind(this);

    }
    static defaultProps = {

    }

    async fetchVideoAndUser() {
        axios.get('http://localhost:8000/api/video?id=' + this.props.match.params.urlName)
            .then((data) => {
                let video = data.data;
                console.log(this.state);
                this.setState({
                    path: video.path,
                    name: video.name,
                    desc: video.desc,
                    authorname: video.user,
                    authorid: video.userid,
                    views: video.views.toLocaleString(),
                    tempRelatedThumb: video.thumbnailPath,
                    liked: video.liked,
                    disliked: video.disliked,
                    likes: video.likes,
                    dislikes: video.dislikes,
                    date: video.uploaded,
                    comments: video.comments,
                    loaded: true
                });
                console.log('video return');
                console.log(video);
                console.log("data");
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    fileNotFound: true,
                    loaded: true
                });

            });
        console.log(this.state);

    }

    likeCallback() {
        this.setState({
            likes: this.state.likes + 1,
        })
    }

    dislikeCallback() {
        this.setState({
            dislikes: this.state.dislikes + 1,
        })
    }

    componentDidMount() {
        this.fetchVideoAndUser();

    }

    setRedirectHome() {
        this.setState({
            redirectHome: true
        })
    }

    render() {
        if (this.state.redirectHome) {
            console.log("rediercting");
            return (<Redirect to="/home" />);
        }
        else if (this.state.fileNotFound == true) {
            console.log("Snackbar");
            return (
                <VideoNotFound />
            );
        }
        else {

            console.log("Videopage");
            let { date, loaded, path, comments, name, desc, videoWidth, views, tempRelatedThumb, authorname, likes,
                dislikes, authorid, liked, disliked } = this.state;
            let likeratio = 50.0;
            if (loaded) {
                console.log(likes + "/" + dislikes);
                if (dislikes != 0 && likes != 0) {
                    likeratio = likes / (likes + dislikes) * 100;

                }

                console.log("likes " + likes);
                console.log("dislikes " + dislikes);
                console.log("likeratio" + likeratio);
                return (
                    <div className="videoPage">
                        <div className="videoSection">
                            <VideoPlayer width={videoWidth + "px"} url={path} />
                            <VideoInfo videoid={this.props.match.params.urlName}
                                width={videoWidth + "px"} name={name} desc={desc} views={views}
                                author={authorname} likeratio={likeratio} authorid={authorid}
                                date={date} likes={likes} dislikes={dislikes} liked={liked} disliked={disliked}
                                likeCallback={this.likeCallback} dislikeCallback={this.dislikeCallback} />
                            <hr />

                            <h4>Comments</h4>
                            <div className="commentSection">
                                <CommentSection videoid={this.props.match.params.urlName} comments={comments} />
                            </div>

                        </div>

                        <RelatedVideosSection thumb={tempRelatedThumb} />
                    </div>
                );
            }
            else
                return (<div className="loadingCircle" ><CircularProgress /></div>)
        }
    }
}

export default withRouter(VideoPage);