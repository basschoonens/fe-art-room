import React from 'react';
import styles from './WelcomeContent.module.css';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const WelcomeContent = () => {
    const {user, isAuth} = useContext(AuthContext);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.welcomeContainer}>
                {isAuth ?
                    <div>
                        <span><img id={styles.profileImage} src="https://via.placeholder.com/100" alt="profile-image"/></span>
                        <h1 className={styles.welcomeMessage}>Welcome {user.username} !</h1>
                        <div className={styles.toolsContainer}>
                            <ul className={styles.appTools}>
                                <li>manage my collection</li>
                                <li>my orders</li>
                                <li>my reviews</li>
                            </ul>
                            <ul className={styles.profileTools}>
                                <li>edit profile</li>
                                <li>sign out</li>
                            </ul>
                        </div>
                    </div>
                    :
                    <h1 className={styles.welcomeMessage}>Welcome guest, we are glad to have you !</h1>
                }
            </div>
        </div>
    );
}
                export default WelcomeContent;