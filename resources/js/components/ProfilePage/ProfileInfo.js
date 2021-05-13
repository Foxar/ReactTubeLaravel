import { Avatar } from '@material-ui/core';
import ProfileEditingButton from './ProfileEditingButton';


function ProfileInfo(props) {
    let id = sessionStorage.getItem('CurrentUserId');
    let editProfile = false;
    if (props.userid == id)
        editProfile = true;

    console.log("Profile info user id: " + id);
    console.log("Url userid user id: " + props.userid);
    console.log("Edit profile" + editProfile);

    let videosString = props.videosCount + " videos";
    if (props.videosCount == 1)
        videosString = props.videosCount + " video";

    return (
        <div className="profileHeader">
            <div className="profileInfo">
                <Avatar src={"/avatars/" + sessionStorage.getItem('CurrentUserId') + ".png"} ></Avatar>
                <div className="profileInfoUsername">
                    <h1>{props.name}</h1>
                    <span>{videosString}</span>
                </div>
            </div>
            <ProfileEditingButton visible={editProfile} />
        </div>
    )
}

export default ProfileInfo;