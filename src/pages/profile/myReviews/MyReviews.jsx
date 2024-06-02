import styles from './MyReviews.module.css';
import WelcomeContent from "../../../components/welcomeContentBar/WelcomeContent.jsx";
import Button from "../../../components/button/Button.jsx";
import React from "react";

export default function MyReviews() {

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
            <div className={styles.profileData}>
                <p>Hier komen al de user zijn reviews in een lijst</p>
            </div>

            <Button text="Logout"/>
        </div>
    )
}