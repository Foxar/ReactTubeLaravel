import '../../App.css';
import React from 'react';
import ValidatedTextField from './ValidatedTextField';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import axiosCsrf from '../Axios/axios.js';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
            PasswordConfirm: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(e) {
        console.log("Handlechange");
        if (e.target.name == "UserName")
            this.setState({ UserName: e.target.value });
        else if (e.target.name == "Password") {
            this.setState({ Password: e.target.value });
        }
        else if (e.target.name == "Passwordconfirm") {
            this.setState({ PasswordConfirm: e.target.value });
        }
        else if (e.target.name == "Email") {
            this.setState({ Email: e.target.value });
        }
        console.log(e.target.value);
    }

    handleSubmit(e) {
        console.log("Submit");
        e.preventDefault();

        var formdata = new FormData();
        formdata.append('name', this.state.UserName);
        formdata.append('password', this.state.Password);
        formdata.append('email', this.state.Email);
        console.log(this.state);
        axiosCsrf.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).
            then((data) => {
                axios.post('http://localhost:8000/register', formdata, { withCredentials: true })
                    .then((data) => {
                        console.log("Register result");
                        console.log(data);
                    });

            });
    }

    render() {
        return (
            <div className="loginPage">
                <div className="loginForm">
                    <form className="loginForm" onSubmit={this.handleSubmit}>
                        <h1>Register</h1>
                        <TextField onChange={this.handleChange} className="loginInput" name="UserName" label="Login" variant="filled" />

                        <ValidatedTextField onChange={this.handleChange} className="loginInput" name="Password" label="Password" type="password" variant="filled" error={this.state.PasswordConfirm != this.state.Password} helperText="Passwords aren't the same." />
                        <TextField onChange={this.handleChange} className="loginInput" name="Passwordconfirm" label="Confirm password" type="password" variant="filled" />
                        <TextField onChange={this.handleChange} className="loginInput" name="Email" label="Email" variant="filled" />
                        <input
                            onChange={this.handleChange}
                            className="uploadInput"
                            id="contained-button-submit"
                            type="submit"
                        />
                        <label htmlFor="contained-button-submit">
                            <Button className="uploadInput" variant="contained" color="secondary" component="span">
                                Submit
                        </Button>
                        </label>
                    </form>
                </div>
            </div>);

    }
}

export default RegisterPage;
