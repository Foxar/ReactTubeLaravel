
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';


function VideoControlMute(props) {
    if (!props.muted) {
        return <VolumeUpIcon />;
    } else {
        return <VolumeOffIcon />;
    }
}

export default VideoControlMute;