import styles from './MyProfile.module.css';
import {AuthContext} from "../../../context/AuthContext.jsx";
import {useContext} from "react";
import WelcomeContent from "../../../components/welcomeContentBar/WelcomeContent.jsx";

export default function MyProfile() {

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
        </div>
    )
}