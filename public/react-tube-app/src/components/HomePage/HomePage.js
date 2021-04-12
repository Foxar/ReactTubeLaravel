import '../../App.css'
import React from 'react';
import RelatedVideo from '../VideoPage/RelatedVideo'
import { withRouter } from "react-router";
import Snackbar from '@material-ui/core/Snackbar';

import { CircularProgress } from '@material-ui/core';
import { random } from 'lodash';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async fetchRandomVideos() {
        const videos = await fetch('http://localhost:8000/random5videos/')
            .then(response => response.json())
            .catch(err => { console.log(err); throw new Error(err); });
        this.setState({
            randomVideos: videos,
            loaded: true
        });

    }

    componentDidMount() {
        this.fetchRandomVideos();
    }
    render() {

        let { loaded, randomVideos } = this.state;
        console.log("Random:");
        console.log(randomVideos);
        if (loaded)
            return (
                <div className="homePage">

                    {
                        randomVideos.map(function (v, index) {
                            console.log(v);
                            return <RelatedVideo url={"/video/" + v.id} title={v.name} views={v.views} channel={v.AuthorName} thumbUrl={"http://localhost:8000/react-tube-app/public/videos/" + v.id + ".png"} />;
                        })
                    }
                </div>

            );
        else
            return (<div className="loadingCircle" ><CircularProgress /></div>)
    }
}

export default withRouter(HomePage);