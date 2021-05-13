import '../../App.css';
import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LoginFailedMessage from './LoginFailedMessage';
import LoginButton from './LoginButton';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import axiosCsrf from '../Axios/axios.js';
import axios from "axios";
import {
    Redirect
} from "react-router-dom";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
            PasswordConfirm: '',
            failedLogin: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //var csrf_token = '{{ echo csrf_token()}}';
        //this.setState({ token: csrf_token });
    }


    handleChange(e) {
        console.log("Handlechange");
        if (e.target.name == "UserName")
            this.setState({ UserName: e.target.value });
        else if (e.target.name == "Password") {
            this.setState({ Password: e.target.value });
        }
        console.log(e.target.value);
    }

    handleSubmit(e) {
        console.log("Submit");
        e.preventDefault();

        this.setState({
            waiting: true
        })

        var formdata = new FormData();
        formdata.append('email', this.state.UserName);
        formdata.append('password', this.state.Password);
        console.log(this.state);
        axiosCsrf.get('http://localhost:8000/api/sanctum/csrf-cookie', { withCredentials: true }).
            then((data) => {
                console.log(data);
                axios.post('http://localhost:8000/login', formdata, { withCredentials: true })
                    .then((data) => {
                        console.log("Login result");
                        console.log(data);
                        if (data.status == 200) {
                            sessionStorage.clear();
                            sessionStorage.setItem('CurrentUser', data.data.name);
                            sessionStorage.setItem('LoggedIn', true);
                            this.setState({
                                //redirectHome: true,
                                waiting: false
                            });
                            axios.get('http://localhost:8000/api/currentuser', { withCredentials: true }).
                                then((data) => {
                                    console.log("Current user");
                                    console.log(data);
                                    sessionStorage.setItem('CurrentUserId', data.data.id);
                                    this.setState({
                                        redirectHome: true,
                                    });
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({
                            failedLogin: true,
                            waiting: false
                        });
                    });

            });

    }

    render() {
        if (this.state.redirectHome == true)
            return (<Redirect to="/" />);
        else
            return (
                <div className="loginPage" >
                    <div className="loginForm">
                        <form className="loginForm" onSubmit={this.handleSubmit}>
                            <h1>Loggin in</h1>
                            <TextField onChange={this.handleChange} className="loginInput" name="UserName" label="Login" variant="filled" />
                            <TextField onChange={this.handleChange} className="loginInput" name="Password" label="Confirm password" type="password" variant="filled" />
                            <input
                                onChange={this.handleChange}
                                className="uploadInput"
                                id="contained-button-submit"
                                type="submit"
                            />
                            <label htmlFor="contained-button-submit">
                                <LoginButton waiting={this.state.waiting} />
                            </label>
                            <LoginFailedMessage failed={this.state.failedLogin} />
                        </form>
                    </div>
                </div>);

    }
}

export default LoginPage;
