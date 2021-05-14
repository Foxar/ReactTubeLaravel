import '../../App.css'
import React from 'react';
import ReactPlayer from 'react-player';
import { IconButton, LinearProgress } from '@material-ui/core';
import VideoControlPlayPause from './VideoControlPlayPause'
import VideoControlMute from './VideoControlMute'
import VideoControlFullscreen from './VideoControlFullscreen'
import { withRouter } from "react-router";
import Fullscreen from "fullscreen-react";


class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            played: 0,
            loaded: 0,
            volume: 100,
            muted: false
        }
    }

    render() {

        const { url, width } = this.props;
        console.log(url);
        console.log(width);

        return (

            <div className="component_videoplayer">
                <Fullscreen isEnter={this.state.fullscreen}>
                    <span>
                        <ReactPlayer playing={this.state.playing} muted width={width} height={'100%'}
                            url={url}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            progressInterval={100}
                            onProgress={(props) => {
                                this.setState(() => ({
                                    played: props.played,
                                    loaded: props.loaded
                                }));
                                console.log(this.state.played);
                            }} />
                        <LinearProgress className="videoProgressBar" variant="buffer" value={this.state.played * 100} valueBuffer={this.state.loaded * 100} />
                        <div id="playbackbuttons">
                            <IconButton className="playbutton" color="secondary" onClick={() => {
                                this.setState((state) => ({
                                    playing: !state.playing
                                }));
                            }
                            }
                            >
                                <VideoControlPlayPause isPlaying={this.state.playing} />
                            </IconButton>
                            <IconButton className="mutebutton" color="secondary" onClick={() => {
                                this.setState((state) => ({
                                    muted: !state.muted
                                }));
                            }}>
                                <VideoControlMute muted={this.state.muted} />
                            </IconButton>
                            <IconButton className="fullscreenbutton" color="secondary" onClick={() => {
                                this.setState((state) => ({
                                    //fullscreen: !state.fullscreen
                                }));
                            }}>
                                <VideoControlFullscreen isFullscreen={this.state.fullscreen} />
                            </IconButton>

                        </div>
                    </span>
                </Fullscreen>
            </div>

        )
    }
}

export default withRouter(VideoPlayer);