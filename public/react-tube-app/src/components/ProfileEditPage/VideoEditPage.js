import React from 'react';
import { CircularProgress, TextareaAutosize } from "@material-ui/core";
import { TextField, Button } from '@material-ui/core';
import axios from "axios";
import WaitPrompt from '../VideoUploadPage/WaitPrompt';
import {
    Redirect
} from "react-router-dom";
import { withRouter } from "react-router";



class VideoEditPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("HEY");
        console.log(props);
        this.state = {
            title: '',
            description: '',
            AppUserId: '',
            videoid: this.props.match.params.videoId,
            loaded: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:8000/video?id=' + this.props.match.params.videoId)
            .then((data) => {
                let video = data.data;
                console.log(this.state);
                this.setState({
                    orgTitle: video.name,
                    orgDesc: video.desc,
                    loaded: true
                });

            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    fileNotFound: true,
                    loaded: true
                });

            });
    }

    handleChange(e) {
        if (e.target.name == "videoTitle")
            this.setState({ title: e.target.value });
        else if (e.target.name == "desc")
            this.setState({ description: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append('name', this.state.title);
        formdata.append('videoid', this.state.videoid);
        formdata.append('desc', this.state.description);
        console.log(this.state);
        this.setState({
            submitted: true,
        })
        axios.post('http://localhost:8000/editvideo', formdata, { withCredentials: true })
            .then((data) => {
                console.log(data);
                var filePath = data.path;
                this.setState({
                    calledVideos: true,
                    videoid: data.data.id,
                });
            });

    }

    render() {
        console.log("state");
        console.log(this.state);
        if (this.state.loaded) {
            if (this.state.calledVideos) {
                console.log("Submitted video to database!");
                return (<Redirect to={"/video/" + this.state.videoid} />);
            }
            let wait = false;
            if (this.state.submitted)
                wait = true;
            return (
                <div className="uploadPage">
                    <div className="uploadForm">
                        <form className="uploadForm" onSubmit={this.handleSubmit}>
                            <h1> Upload Video</h1>
                            <TextField
                                name="videoTitle"
                                className="uploadInput"
                                label="Video title"
                                defaultValue={this.state.orgTitle}
                                variant="filled"
                                onChange={this.handleChange}
                                required />
                            <TextareaAutosize
                                name="desc"
                                onChange={this.handleChange}
                                className="uploadInput"
                                rowsMax={40}
                                rowsMin={10}
                                defaultValue={this.state.orgDesc}
                                required />

                            <input
                                onChange={this.handleChange}
                                className="uploadInput"
                                id="contained-button-submit"
                                type="submit"
                            />
                            <label htmlFor="contained-button-submit">
                                <Button className="uploadInput" variant="contained" color="secondary" component="span">
                                    Submit
                            </Button>
                            </label>
                            <WaitPrompt wait={wait} />
                        </form>
                    </div>
                </div>);
        }
        else {
            console.log("Loading..");
            return <CircularProgress />
        }
    }
}

export default withRouter(VideoEditPage);
