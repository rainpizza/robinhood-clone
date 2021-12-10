import { Button } from '@material-ui/core';
import {React, useState} from 'react';
import './TimeLine.css';
import { storage } from './firebase';

function TimeLine() {
    const [image, setImage] = useState('');
    const upload = () => {
        if (image == null)
            return;
        storage.ref(`/images/${image.name}`).put(image)
            .on("state_changed", alert("success"), alert);
    }
    return (
        <div className="timeline__container">
            <div className="timeline__buttons__container">
                <div className="timeline__button">LIVE</div>
                <div className="timeline__button">1D</div>
                <div className="timeline__button active">1W</div>
                <div className="timeline__button">3M</div>
                <div className="timeline__button">1Y</div>
                <div className="timeline__button">ALL</div>
            </div>
            <div>
                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                <Button color="primary" className="MuiButton-root" onClick={upload}>Save Graph</Button>
            </div>

        </div>
    )
}


export default TimeLine
