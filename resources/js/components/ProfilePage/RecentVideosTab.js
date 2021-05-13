import '../../App.css';
import React from 'react';
import VideoStub from '../VideoPage/VideoStub';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { IconButton, TextField, Avatar, CircularProgress } from '@material-ui/core';

class RecentVideosTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            userid: this.props.userid
        }
    }
    static defaultProps = {

    }

    async fetchRandomVideos() {
        const videos = await fetch('http://localhost:8000/api/getuserrecentvideos?userid=' + this.state.userid)
            .then(response => response.json())
            .catch(err => { console.log(err); throw new Error(err); });
        this.setState({
            randomVideos: videos,
            loaded: true
        });
        console.log("Got random videos");
        console.log(this.state.randomVideos);
    }



    componentDidMount() {
        this.fetchRandomVideos();

    }

    render() {
        let { randomVideos, loaded } = this.state;
        if (loaded == true) {
            return (
                <div className="profileRecentVideos">
                    <h3>Recent videos</h3>
                    {
                        randomVideos.map(function (v, index) {
                            console.log(v);
                            return <VideoStub url={"/video/" + v.id} title={v.name} views={v.views} channel={v.AuthorName} thumbUrl={"http://localhost:8000/videos/" + v.id + ".png"} />;
                        })
                    }
                </div>
            );
        }
        else
            return (<CircularProgress />)
    }
}

export default RecentVideosTab;