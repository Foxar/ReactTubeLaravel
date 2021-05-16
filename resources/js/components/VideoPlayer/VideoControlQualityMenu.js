import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import VideoControlQuality from './VideoControlQuality';
import { IconButton } from '@material-ui/core';

class QualityMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qualityOn: false,
            selectedQuality: 1,
            anchorEl: null,
            selected: 1
        }

        this.chooseQuality = props.chooseQuality;
        this.handleClick = this.handleClick.bind(this);
        this.select = this.select.bind(this);

    }


    handleClick(event) {
        this.setState({
            qualityOn: !this.state.qualityOn,
            anchorEl: event.currentTarget
        })
        console.log("Handle click");
        this.forceUpdate();
    };

    handleClose() {
        this.setState({
            anchorEl: null
        });
    };
    select(opt) {
        console.log("selecting " + opt);
        this.setState({
            selectedQuality: opt
        });
        this.setState({
            anchorEl: null
        });
        console.log("Selected: " + this.state.selectedQuality);
        this.chooseQuality(opt);
    };


    render() {
        var opt1Class = "qualityOption";
        var opt2Class = "qualityOption";
        var opt3Class = "qualityOption";

        if (this.state.selectedQuality == 1)
            opt1Class = "selectedQuality";
        if (this.state.selectedQuality == 2)
            opt2Class = "selectedQuality";
        if (this.state.selectedQuality == 3)
            opt3Class = "selectedQuality";
        return (
            <span>
                <IconButton className="qualityButton" color="secondary" onClick={this.handleClick}>
                    <VideoControlQuality qualityOn={this.state.qualityOn} />
                </IconButton>

                <Menu
                    id="quality-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    className="qualityMenu"
                >
                    <MenuItem className={opt1Class} onClick={() => { this.select(1) }}>Higha quality</MenuItem>
                    <MenuItem className={opt2Class} onClick={() => { this.select(2) }}>Medium quality</MenuItem>
                    <MenuItem className={opt3Class} onClick={() => { this.select(3) }}>Low quality</MenuItem>
                </Menu>
            </span >
        );
    }
}

export default QualityMenu;