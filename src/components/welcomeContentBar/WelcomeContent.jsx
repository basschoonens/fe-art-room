import React from 'react';
import styles from './WelcomeContent.module.css';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

const WelcomeContent = () => {
    const {user, isAuth} = useContext(AuthContext);

    return (
        <div className={styles.welcomeContainer}>
            {isAuth ?
                <div className={styles.welcomeLoggedIn}>
                    <h1 className={styles.welcomeMessage}>Welcome {user.username} !</h1>
                    <div className={styles.toolsContainer}>
                        {user.authority === "ROLE_ARTIST" &&
                        <ul className={styles.appTools}>
                            <Link to="/artistgallery"><li>Manage my collection</li></Link>
                            <Link to="/artistgallery/addnewartwork"><li>Add new artwork</li></Link>
                            <Link to={"/artistgallery/leftreviews"}><li>Reviews for your art</li></Link>
                        </ul>}
                        <ul className={styles.profileTools}>
                            <Link to="/myorders"><li>My orders</li></Link>
                            <Link to="/myreviews"><li>My reviews</li></Link>
                            <li>edit profile</li>
                            <li>sign out</li>
                        </ul>
                    </div>
                </div>
                :
                <div className={styles.welcomeNotLoggedIn}>
                <h1 className={styles.welcomeMessage}>Welcome guest, we are glad to have you !</h1>
                </div>
            }
        </div>
    );
}
export default WelcomeContent;