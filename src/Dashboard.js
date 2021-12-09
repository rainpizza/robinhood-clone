import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import Header from './Header';
import Newsfeed from './Newsfeed';
import  Stats  from './Stats';

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="app__header" >
                <Header />
            </div>
            <div className="app__body__empty" id="box1_empty">
                <div className="app__container">
                    <Newsfeed />
                    <Stats />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;