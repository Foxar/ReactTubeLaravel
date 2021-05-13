import '../../App.css'
import React from 'react';
import { withRouter } from "react-router";
import RelatedVideo from '../VideoPage/RelatedVideo';
import { CircularProgress } from '@material-ui/core';



class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: this.props.match.params.search
        }
        this.search = this.search.bind(this);

    }
    static defaultProps = {

    }

    search() {
        var formdata = new FormData();
        formdata.append('search', this.state.search);
        console.log(this.state);
        fetch('http://localhost:8000/api/find?search=' + this.state.search)
            .then(response => response.json())
            .then((data) => {
                console.log("Search results");
                console.log(data);
                this.setState({
                    loadedSearchReults: true,
                    videos: data
                })
            });
    }

    componentDidMount() {
        this.search();

    }

    render() {
        let { videos } = this.state;
        if (this.state.loadedSearchReults != true) {
            return (<div className="loadingCircle" ><CircularProgress /></div>)
        }
        else {
            return (
                <div className="homePage">
                    {
                        videos.map(function (v, index) {
                            console.log(v);
                            return <RelatedVideo url={"/video/" + v.id} title={v.name} views={v.views} channel={v.AuthorName} thumbUrl={"http://localhost:8000/videos/" + v.id + ".png"} />;
                        })
                    }
                </div>

            );
        }
    }
}

export default withRouter(SearchPage);