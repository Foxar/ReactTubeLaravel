import Typography from '@material-ui/core/Typography';

function LoginFailedMessage(props) {
    if (props.failed == true) {
        return (<Typography color="error" variant="body2" gutterBottom>
            Login failed!
        </Typography>)
    } else {
        return <span></span>;
    }
}

export default LoginFailedMessage;