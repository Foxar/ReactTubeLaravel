import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';

function VideoControlQuality(props) {
    if (props.qualityOn) {
        return <SettingsApplicationsOutlinedIcon />
    }
    else {
        return <SettingsApplicationsIcon />
    }
}
export default VideoControlQuality;