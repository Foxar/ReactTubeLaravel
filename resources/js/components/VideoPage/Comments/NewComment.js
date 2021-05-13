import React from 'react';
import axios from "axios";

import { Avatar, Button, CircularProgress, TextField } from "@material-ui/core";

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            videoid: props.videoid,
            postedComment: false,
            postingComment: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name == "comment")
            this.setState({ content: e.target.value });
    }

    handleSubmit(e) {
        this.setState({
            postingComment: true,
        })
        e.preventDefault();
        console.log("Submitting");
        var formdata = new FormData();
        formdata.append('videoid', this.state.videoid);
        formdata.append('content', this.state.content);
        console.log(this.state);
        axios.post('http://localhost:8000/api/newcomment', formdata, { withCredentials: true })
            .then((data) => {
                console.log(data);
                this.setState({
                    postingComment: false,
                    postedComment: true,
                });
            });
    }

    render() {
        console.log(sessionStorage.getItem('CurrentUser'));
        console.log(this.state);
        if (sessionStorage.getItem('CurrentUser') == undefined) {
            return (
                <div className="newComment">
                    <h3>Log in to post a comment</h3>
                </div>
            );
        }
        else {

            if (this.state.postingComment)
                return (
                    <div className="newComment">
                        <CircularProgress />
                    </div>
                );
            else if (this.state.postedComment) {
                window.location.reload(false);
                return (
                    <div className="newComment">
                        <CircularProgress />
                    </div>
                );
            }

            else
                return (
                    <div className="newComment">
                        <Avatar />
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="comment"
                                onChange={this.handleChange}
                                className="commentInput"
                                multiline
                                rowsMax={40}
                                rows={2}
                                color="secondary"
                                variant="filled"
                                required />
                            <input
                                onChange={this.handleChange}
                                id="contained-button-submit"
                                type="submit"
                            />
                            <label htmlFor="contained-button-submit">
                                <Button type="submit" variant="contained" color="secondary">Post</Button>
                            </label>
                        </form>
                    </div>
                );
        }
    }
}

export default NewComment;