import styles from './MyProfile.module.css';
import {AuthContext} from "../../../context/AuthContext.jsx";
import {useContext} from "react";
import WelcomeContent from "../../../components/welcomeContentBar/WelcomeContent.jsx";
import Button from "../../../components/button/Button.jsx";

export default function MyProfile() {

    const {logout} = useContext(AuthContext);

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
        </div>
    )
}