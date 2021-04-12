
import { Button } from '@material-ui/core';


function ProfileEditingButton(props) {

    if (props.visible != true) {
        console.log("Profile not editing");
        return (<div></div>);
    }
    else {
        console.log("Profile editing");
        return (
            <div className="profileEditingContainer">
                <Button href="/editprofile" className="ProfileEditingButton" variant="contained" color={"secondary"}>
                    Edit profile
                </Button>
            </div>);
    }
}

export default ProfileEditingButton;