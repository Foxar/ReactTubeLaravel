import '../../App.css'
import React from 'react';
import ProfileInfo from '../ProfilePage/ProfileInfo';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/core/Tab';
import { withRouter } from "react-router";
import Divider from '@material-ui/core/Divider';
import { CircularProgress } from '@material-ui/core';
import RecentVideosTab from '../ProfilePage/RecentVideosTab';
import ProfileDetailsTab from '../ProfilePage/ProfileDetailsTab';
import AllVideosTab from '../ProfilePage/AllVideosTab';
import ProfileDetails from '../ProfilePage/ProfileDetailsTab';
import ProfileEditForm from './ProfileEditForm';
import VideoEditList from './VideoEditList';



class ProfileEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tab: 0
        }
        this.handleChange = this.handleChange.bind(this);


    }
    static defaultProps = {

    }

    async fetchProfile() {
        let id = sessionStorage.getItem('CurrentUserId');
        const profile = await fetch('http://localhost:8000/profile?id=' + id)
            .then(response => response.json())
            .catch(err => { console.log(err); throw new Error(err); });
        console.log("PROFILE");
        console.log(profile);
        this.setState({
            name: profile.name,
            videos: profile.videos,
            desc: profile.desc,
            loading: false
        });
        console.log(profile);

    }

    componentDidMount() {
        this.fetchProfile();
    }
    handleChange(event, newValue) {
        this.setState({
            tab: newValue,
        });
    };

    render() {


        if (this.state.loading) {
            return (<div className="loadingCircle" ><CircularProgress /></div>);
        }
        else {
            console.log("STATE");
            console.log(this.state);
            let { tab } = this.state;
            let tab_content = [
                <ProfileEditForm name={this.state.name} description={this.state.desc} />,
                <VideoEditList videos={this.state.videos} />,
                <span></span>
            ];
            let value = 1;
            return (
                <div className="profileEditPage">

                    <div className="profileEditSection">
                        <div className="verticalTabs">
                            <Paper
                                elevation={0}
                                color="secondary">
                                <Tabs
                                    className="profileEditTabs"

                                    centered
                                    value={tab}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                    textColor="secondary">
                                    <Tab className="profileTab" label="Edit profile" />
                                    <Tab className="profileTab" label="Edit videos" />
                                    <Tab className="profileTab" label="Sample text" />
                                </Tabs>
                            </Paper>
                        </div>
                        <div className="tabContent">
                            {tab_content[tab]}
                        </div>



                    </div>
                </div>
            );
        }

    }

}

export default withRouter(ProfileEditPage);
