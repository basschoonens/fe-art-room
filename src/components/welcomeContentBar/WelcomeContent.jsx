import React from 'react';
import styles from './WelcomeContent.module.css';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

const WelcomeContent = () => {
    const {user, isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.welcomeContainer}>
            {isAuth ?
                <div className={styles.welcomeLoggedIn}>
                    <h1 className={styles.welcomeMessage}>Welcome {user.username} !</h1>
                    <div className={styles.toolsContainer}>
                        {user.authority === "ROLE_ARTIST" &&
                            <ul className={styles.appTools}>
                                <ul className={styles.appTools}>
                                    <li><Link to="/artistgallery">Manage my collection</Link></li>
                                    <li><Link to="/artistgallery/addnewartwork">Add new artwork</Link></li>
                                    <li><Link to="/artistgallery/leftreviews">Reviews for your art</Link></li>
                                </ul>
                            </ul>}
                        {(user.authority === "ROLE_USER" || user.authority === "ROLE_ARTIST") &&
                            <ul className={styles.profileTools}>
                                <li><Link to="/myorders">My orders</Link></li>
                                <li><Link to="/myreviews">My reviews</Link></li>
                                <li><Link to="/editprofile">Edit profile</Link></li>
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                    }} className={styles.logoutLink}>
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        }
                        {user.authority === "ROLE_ADMIN" &&
                            <ul className={styles.appTools}>
                                <ul className={styles.appTools}>
                                    <li><Link to="/allreviews">Find all reviews</Link></li>
                                    <li><Link to="/allorders">Find all orders</Link></li>
                                    <li>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }} className={styles.logoutLink}>
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </ul>}
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