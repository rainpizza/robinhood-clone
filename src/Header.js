import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "./firebase";
import './Header.css';

function Header() {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();

    const fetchUserName = async () => {
        try {
            const query = await db
                .collection("users")
                .doc(user?.uid)
                .get();
            const data = await query.docs[0].data();
            console.log(query.docs[0].data(), "here");
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");

        // fetchUserName();
    }, [user, loading]);
    return (
        <div className="header__wrapper">
            <div class="wrapper site-header__wrapper">
                <a class="item">Firestock</a>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header
