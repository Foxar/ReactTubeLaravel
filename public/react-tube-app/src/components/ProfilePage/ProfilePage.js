import '../../App.css'
import React from 'react';
import ProfileInfo from './ProfileInfo';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/core/Tab';
import { withRouter } from "react-router";
import Divider from '@material-ui/core/Divider';
import { CircularProgress } from '@material-ui/core';
import RecentVideosTab from './RecentVideosTab';
import ProfileDetailsTab from './ProfileDetailsTab';
import AllVideosTab from './AllVideosTab';
import ProfileDetails from './ProfileDetailsTab';



class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        console.log("HEY");
        console.log(props);
        this.state = {
            loading: true,
            tab: 0
        }
        this.handleChange = this.handleChange.bind(this);


    }
    static defaultProps = {

    }

    async fetchProfile() {
        console.log("Fetching profile " + this.props.match.params.profileId);
        const profile = await fetch('http://localhost:8000/profile?id=' + this.props.match.params.profileId)
            .then(response => response.json())
            .catch(err => { console.log(err); throw new Error(err); });
        this.setState({
            name: profile.name,
            videosCount: Object.keys(profile.videos).length,
            videos: profile.videos,
            joined: profile.joined,
            desc: profile.desc,
            views: profile.views,
            loading: false
        });
        console.log(Object.keys(profile.videos).length);
        console.log("Got it");
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
        console.log("/avatars/" + sessionStorage.getItem('CurrentUserId') + ".png");
        if (this.state.loading) {
            return (<div className="loadingCircle" ><CircularProgress /></div>);
        }
        else {
            let { tab, joined, desc, views, videosCount } = this.state;
            let tab_content = [
                <RecentVideosTab userid={this.props.match.params.profileId} />,
                <AllVideosTab userid={this.props.match.params.profileId} />,
                <ProfileDetails views={views} desc={desc} joined={joined} />
            ];
            return (
                <div className="profilePage">
                    <div className="profileSection">
                        <ProfileInfo videosCount={videosCount} userid={this.props.match.params.profileId} name={this.state.name} />
                        <Paper
                            elevation={0}>
                            <Tabs
                                centered
                                value={tab}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary">
                                <Tab className="profileTab" label="Recent videos" />
                                <Tab className="profileTab" label="All videos" />
                                <Tab className="profileTab" label="Information" />
                            </Tabs>
                        </Paper>
                        <Divider />
                        <div>
                            {tab_content[tab]}
                        </div>
                    </div>
                </div>
            );
        }

    }

}

export default withRouter(ProfilePage);
