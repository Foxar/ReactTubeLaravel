
import '../../../App.css'
import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { CircularProgress } from '@material-ui/core';



class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            comments: props.comments,
            videoid: props.videoid
        }


    }



    render() {
        console.log(this.state.comments);
        if (this.state.loaded)
            return (
                <span>
                    <NewComment videoid={this.state.videoid} />
                    {this.state.comments.map(function (comment, index) {
                        return <Comment key={index} comment={comment} />;
                    })}
                </span>
            );
        else
            return <div className="loading"><span><CircularProgress color="secondary" /></span></div>;
    }
}
export default CommentSection;