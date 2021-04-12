import { TextField, Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import axiosCsrf from '../Axios/axios.js';

class ProfileEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log("ProfileEDitForm props");
        console.log(props);
        this.state = {

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    };

    handleChange(e) {
        console.log("Handlechange");
        if (e.target.name == "UserName")
            this.setState({ UserName: e.target.value });
        else if (e.target.name == "description") {
            this.setState({ desc: e.target.value });
        }
        else if (e.target.name == "fileupload") {
            this.setState({ file: e.target.files[0] });
        }
        console.log(e.target.value);
        console.log(this.state);
    }

    handleSubmit(e) {
        console.log("Submit");
        e.preventDefault();

        var formdata = new FormData();
        if (this.state.UserName != undefined)
            formdata.append('name', this.state.UserName);
        if (this.state.desc != undefined)
            formdata.append('desc', this.state.desc);
        if (this.state.file != undefined)
            formdata.append('file', this.state.file);

        console.log(this.state);
        console.log(formdata);


        axiosCsrf.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).
            then((data) => {
                axios.post('http://localhost:8000/edituser', formdata, { withCredentials: true })
                    .then((data) => {
                        console.log("Edit result");
                        console.log(data);
                    });

            });
    }



    render() {
        return (
            <form className="profileEditForm" onSubmit={this.handleSubmit} >
                <h4>Channel name:</h4>
                <TextField name="UserName" defaultValue={this.props.name} onChange={this.handleChange} color="secondary" variant="filled" />
                <h4>Channel description:</h4>
                <TextField
                    onChange={this.handleChange}
                    id="standard-multiline-static"
                    name="description"
                    multiline
                    rows={8}
                    variant="filled"
                    color="secondary"
                    defaultValue={this.props.description}
                />

                <input
                    name="fileupload"
                    onChange={this.handleChange}
                    accept="image/*"
                    className="uploadInput"
                    id="contained-button-file"
                    type="file"
                    required
                />
                <label htmlFor="contained-button-file">
                    <Button className="uploadInput" variant="contained" color="secondary" component="span">
                        Avatar
                    </Button>
                </label>


                <input
                    onChange={this.handleChange}
                    className="uploadInput"
                    id="contained-button-submit"
                    type="submit"
                />
                <label htmlFor="contained-button-submit">
                    <Button className="uploadInput" variant="contained" color="secondary" component="span">
                        Save
                    </Button>
                </label>
            </form>

        );
    }

}


export default ProfileEditForm;