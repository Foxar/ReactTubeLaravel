import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

function VideoControlFullscreen(props) {
    if (props.isFullscreen) {
        return <FullscreenExitIcon />;
    } else {
        return <FullscreenIcon />;
    }
}

export default VideoControlFullscreen;