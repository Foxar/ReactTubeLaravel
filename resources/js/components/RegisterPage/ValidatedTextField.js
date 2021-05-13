
import '../../App.css';
import { TextField } from '@material-ui/core';

function ValidatedTextField(props) {
    if (props.error == true)
        return <TextField onChange={props.onChange} className="loginInput" name={props.name} label={props.label} variant="filled" error helperText={props.helperText} />
    else
        return <TextField onChange={props.onChange} className="loginInput" name={props.name} label={props.label} variant="filled" />
}

export default ValidatedTextField;