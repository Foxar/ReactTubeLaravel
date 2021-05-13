import React from 'react';
import { TextareaAutosize } from "@material-ui/core";
import { TextField, Button } from '@material-ui/core';
import axios from "axios";
import WaitPrompt from './WaitPrompt';
import {
    Redirect
} from "react-router-dom";


class VideoUploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            AppUserId: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name == "videoTitle")
            this.setState({ title: e.target.value });
        else if (e.target.name == "desc")
            this.setState({ description: e.target.value });
        else if (e.target.name == "fileupload") {
            this.setState({ file: e.target.files[0] });
            console.log(e.target.value);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append('name', this.state.title);
        formdata.append('desc', this.state.description);
        formdata.append('AppUserId', "asdfads");
        console.log(this.state);
        axios.post('http://localhost:8000/api/uploadvideo', formdata, { withCredentials: true })
            .then((data) => {

                console.log(data);
                var filePath = data.path;
                this.setState({
                    calledVideos: true,
                    videoid: data.data.id,
                });

                var fileformdata = new FormData();
                fileformdata.append('path', filePath);
                fileformdata.append('file', this.state.file);
                fileformdata.append('videoid', data.data.id);
                console.log("fetching with " + this.state.file);
                console.log(data.data.id);
                axios.post('http://localhost:8000/api/uploadvideofile', fileformdata, { withCredentials: true })
                    .then((data) => {
                        console.log("reply from videofileupload");
                        console.log(data);
                        this.setState({
                            uploadedVideo: true
                        });
                    });

            });

    }

    render() {
        console.log("state");
        console.log(this.state);
        if (this.state.calledVideos) {
            console.log("Submitted video to database!");
        }
        if (this.state.uploadedVideo)
            console.log("Uploaded video");
        if (this.state.uploadedVideo) {
            return (<Redirect to={"/video/" + this.state.videoid} />);
        }
        let wait = false;
        if (this.state.calledVideos && !this.state.uploadedVideo)
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
                            variant="filled"
                            onChange={this.handleChange}
                            required />
                        <TextareaAutosize
                            name="desc"
                            onChange={this.handleChange}
                            className="uploadInput"
                            rowsMax={40}
                            rowsMin={10}
                            defaultValue="Video description here..."
                            required />

                        <input
                            name="fileupload"
                            onChange={this.handleChange}
                            accept="video/*"
                            className="uploadInput"
                            id="contained-button-file"
                            type="file"
                            required
                        />
                        <span>Max file size: 400MB</span>
                        <label htmlFor="contained-button-file">
                            <Button className="uploadInput" variant="contained" color="secondary" component="span">
                                Upload
                            </Button>
                        </label>

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
}

export default VideoUploadPage;
