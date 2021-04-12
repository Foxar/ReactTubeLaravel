import { CircularProgress } from '@material-ui/core';
import '../../App.css';


function WaitPrompt(props) {
    if (props.wait) {
        return (
            <div className="waitPrompt">
                <h1>Please wait for video to process.</h1>
                <div>
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }
    else
        return (
            <span></span>
        );

}

export default WaitPrompt