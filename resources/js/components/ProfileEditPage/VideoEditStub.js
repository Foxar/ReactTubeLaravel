import VideoStub from '../VideoPage/VideoStub'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import axiosCsrf from '../Axios/axios.js';

function VideoEditStub(props) {
    let v = props.v;

    var formdata = new FormData();
    formdata.append('id', v.id);

    console.log("VideoEditStub");
    console.log(props);
    console.log("v");
    console.log(v);
    console.log(props.v);
    return (
        <div className="videoEditStub">
            <VideoStub url={"/editvideo/" + v.id} title={v.name} views={v.views} channel={v.AuthorName} thumbUrl={"http://localhost:8000/videos/" + v.id + ".png"} />
            <span>
                <IconButton className="mutebutton" color="secondary" onClick={() => {
                    axiosCsrf.get('http://localhost:8000/api/sanctum/csrf-cookie', { withCredentials: true }).
                        then((data) => {
                            axios.post('http://localhost:8000/api/deletevideo', formdata, { withCredentials: true })
                                .then((data) => {
                                    console.log("Deleted video");
                                });

                        });
                }}>
                    <DeleteIcon />
                </IconButton>
            </span>
        </div>
    );
}
export default VideoEditStub;