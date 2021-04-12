import '../../App.css';
import { Button, IconButton, TextField, Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import axiosCsrf from '../Axios/axios.js';
import axios from 'axios';
import React from 'react';


function HeaderProfile(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();

        axios.post('http://localhost:8000/logout').then(() => {
            sessionStorage.removeItem('CurrentUser');
            sessionStorage.removeItem('LoggedIn');
            sessionStorage.clear();
            console.log("Logged out");
            window.location.reload();
        });
        /*
                console.log("Logging out");
                axiosCsrf.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).
                    then((data) => {
                        console.log(data);
                        axios.post('http://localhost:8000/logout').then(() => {
                            sessionStorage.removeItem('CurrentUser');
                            sessionStorage.removeItem('LoggedIn');
                            sessionStorage.clear();
                            console.log("Logged out");
                            //window.location.reload();
                        });
                    });
                    */
    }


    console.log(props);
    if (props.loggedin == "true") {
        return (
            <div className="headerCell headerProfile">
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}

                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    className="accountMenu"
                >
                    <MenuItem component={Link} to={"/profile/" + sessionStorage.getItem('CurrentUserId')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Button onClick={handleClick} variant="outlined" color="secondary" size="large">
                    <Avatar src={"/avatars/" + sessionStorage.getItem('CurrentUserId') + ".png"} ></Avatar>
                    {props.username}
                </Button>
            </div>);
    }
    else {
        return (
            <div className="headerCell headerProfile">
                <Button href="/login" variant="outlined" color="secondary" size="large">

                    Login
                </Button>
            </div>
        );
    }

}

export default HeaderProfile;