import '../../../App.css'
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';


function Comment(props) {
    return (
        <Paper elevation={0} square className="comment" color="secondary">
            <div className="commentAvatar">
                <Avatar src={"/avatars/" + props.comment.user_id + ".png"} ></Avatar>
            </div>
            <div className="commentBody">
                <div className="commentInfo">
                    <h3>{props.comment.author}</h3>
                    <span>{props.comment.postDate.date.day + " " + props.comment.postDate.date.month + " " + props.comment.postDate.date.year}</span>
                </div>
                <div className="content">
                    <p>
                        {props.comment.content}
                    </p>
                </div>
            </div>

        </Paper >
    );
}


export default Comment;