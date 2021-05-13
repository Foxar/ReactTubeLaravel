import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import VideoPage from './components/VideoPage/VideoPage'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProfileEditPage from './components/ProfileEditPage/ProfileEditPage'
import VideoEditList from './components/ProfileEditPage/VideoEditList'
import VideoEditPage from './components/ProfileEditPage/VideoEditPage'
import VideoUploadPage from './components/VideoUploadPage/VideoUploadPage'
import Header from './components/Header/Header'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SearchPage from './components/SearchPage/SearchPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3A405A',
        },
        secondary: {
            main: '#99B2DD',
        },
        info: {
            main: '#2190CF'
        }
    },
});



function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router forceRefresh={true}>
                    <Header />
                    <Switch>

                        <Route path="/editvideo/:videoId">
                            <VideoEditPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/search/:search">
                            <SearchPage />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <Route path="/video/:urlName">
                            <VideoPage />
                        </Route>
                        <Route path="/video/:urlName">
                            <VideoPlayer />
                        </Route>
                        <Route path="/testvideopage">
                            <VideoPlayer />
                        </Route>
                        <Route path="/videoupload">
                            <VideoUploadPage />
                        </Route>
                        <Route path="/profile/:profileId">
                            <ProfilePage />
                        </Route>
                        <Route path="/editprofile/">
                            <ProfileEditPage />
                        </Route>
                        <Route path="/home">
                            <HomePage />
                        </Route>
                        <Route path="/">
                            <ul style={{ paddingTop: '6em' }}>
                                <li><Link to="/video/1">Video1</Link></li>
                                <li><Link to="/video/2-wtg">Video2</Link></li>
                                <li><Link to="/video/3">Video3</Link></li>
                                <li><Link to="/video/4">Video4</Link></li>
                                <li><Link to="/" onClick={() => {
                                    console.log("Logging out");
                                    axios.get('http://localhost:8000/api/logout').then(() => {
                                        sessionStorage.setItem('CurrentUser', null);
                                        sessionStorage.setItem('LoggedIn', false);
                                        console.log("Logged out");
                                        window.location.reload();
                                    });
                                }}>Log out</Link></li>
                                <li><Link to="/login">Log in</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </ul>
                            <h1>Welcome to ReactTube</h1>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
