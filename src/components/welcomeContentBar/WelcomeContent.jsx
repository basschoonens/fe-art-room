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
                    <span><img id={styles.profileImage} src="https://via.placeholder.com/100"
                               alt="profile-image"/></span>
                    <h1 className={styles.welcomeMessage}>Welcome {user.username} !</h1>
                    <div className={styles.toolsContainer}>
                        <ul className={styles.appTools}>
                            <Link to="/artistgallery"><li>manage my collection</li></Link>
                            <Link to="/myorders"><li>my orders</li></Link>
                            <Link to="/myreviews"><li>my reviews</li></Link>
                        </ul>
                        <ul className={styles.profileTools}>
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