import React from 'react';
import './Newsfeed.css';
import LineGraph from './LineGraph';
import TimeLine from './TimeLine';

function Newsfeed() {
    return (
        <div className="newsfeed">
            <div className="newsfeed__container">
                <div className="newsfeed__chartSection">
                    <div className="newsfeed__portfolio">
                        <h1>$4,000.50</h1>
                        <p>$44.63 (+0.04%) Today</p>
                    </div>
                    <div className="newsfeed__chart">
                        <LineGraph />
                        <TimeLine />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsfeed
