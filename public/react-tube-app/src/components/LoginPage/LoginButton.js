
import { TextField, Button, CircularProgress } from '@material-ui/core';


function LoginButton(props) {

    if (props.waiting == true) {
        return (
            <Button className="loginInput" variant="contained" color="secondary" component="span">
                <span>
                    Login
                </span>
                <CircularProgress color="primary" size="1.5em" thickness={5} />
            </Button>);
    }
    else {
        return (
            <Button className="loginInput" variant="contained" color="secondary" component="span">
                <span>
                    Login
                </span>
            </Button>);
    }

}

export default LoginButton;