import styles from './Profile.module.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import WelcomeContent from "../../components/welcomeContentBar/WelcomeContent.jsx";
import Button from "../../components/button/Button.jsx";

export default function Profile() {

    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
                <div className={styles.profileData}>
                    <p>Hier komt ingelogde profiledata</p>
                </div>

            <Button onClick={logout} text="Logout"/>
        </div>

    )
}