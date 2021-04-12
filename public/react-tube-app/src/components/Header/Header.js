import '../../App.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PublishIcon from '@material-ui/icons/Publish';
import { Button, IconButton, TextField, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HeaderProfile from './HeaderProfile';
import React from 'react';
import {
    Redirect
} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        console.log("Handle search change");
        if (e.target.name == "search")
            this.setState({ search: e.target.value });
        console.log(e.target.value);
    }

    handleSubmit(e) {
        console.log("Submit");
        e.preventDefault();

        this.setState({ redirect: true });

    }

    render() {
        if (this.state.redirect == true) {
            return (<Redirect to={"/search/" + this.state.search} />);
        }
        else
            return (
                <div className="header">
                    <div className="headerRow">
                        <div className="headerCell">
                            <IconButton color="secondary" href="/home">
                                <HomeRoundedIcon />
                            </IconButton>
                        </div>
                        <div className="headerCell headerSearch">
                            <form className="loginForm" onSubmit={this.handleSubmit}>
                                <TextField color="secondary" onChange={this.handleChange} className="searchInput" label="Search" name="search" variant="outlined" />
                                <input
                                    onChange={this.handleChange}
                                    className="searchInput"
                                    id="contained-button-search"
                                    type="submit"
                                />
                                <label htmlFor="contained-button-search">
                                    <IconButton color="secondary" className="searchInput" component="span">
                                        <SearchIcon />
                                    </IconButton>
                                </label>
                            </form>
                        </div>
                        <div className="headerCell headerUpload">
                            <Button href="/videoupload" variant="outlined" color="secondary" size="large">
                                Upload
                            <PublishIcon />
                            </Button>
                        </div>
                        <HeaderProfile
                            loggedin={sessionStorage.getItem('LoggedIn')}
                            username={sessionStorage.getItem('CurrentUser')} />

                    </div>
                </div>
            );
    }
}

export default Header;
