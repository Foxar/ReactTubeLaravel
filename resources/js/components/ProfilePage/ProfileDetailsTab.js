import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



function ProfileDetailsTabs(props) {
    let desc = props.desc;
    let views = props.views;
    if (desc == undefined) {
        console.log("Undefined desc");
        desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet vestibulum nisl. Etiam malesuada nunc eu risus varius porttitor. Suspendisse euismod quis magna eget dictum. Etiam id ex purus. Nam velit dolor, eleifend semper volutpat ullamcorper, vestibulum vel odio. Suspendisse ac velit ut tellus malesuada molestie et sit amet odio. Ut feugiat scelerisque sapien, in aliquam metus vulputate ac. Vivamus lectus odio, tincidunt in lectus sed, malesuada malesuada augue. Vestibulum lectus magna, pharetra et eleifend sit amet, blandit at turpis. Maecenas imperdiet, dui eget condimentum posuere, diam sapien maximus mi, ac laoreet tortor sem efficitur tellus. Curabitur molestie ut nisl vitae laoreet. Curabitur in dui est. Suspendisse nisi sem, suscipit sit amet tincidunt lobortis, dapibus pellentesque velit. Donec quis odio dictum leo aliquet mattis.";
    }
    else
        console.log("Defined desc");
    return (
        <div className="profileDetailsTab">
            <h3>Profile details</h3>
            <div className="profileDetails">
                <div className="profileDescription">
                    <Typography variant="body2" gutterBottom>
                        {desc}
                    </Typography>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="stats">
                    <div className="creationdate">
                        <h4>Creation date:</h4>
                        <p>{props.joined.date.day + " " + props.joined.date.month + " " + props.joined.date.year}</p>
                    </div>
                    <div className="channelviews">
                        <h4>Channel views:</h4>
                        <p>{views}</p>
                    </div>
                    <div className="videosviews">
                        <h4>All videos views:</h4>
                        <p>114,156</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetailsTabs;