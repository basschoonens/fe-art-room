import styles from './Profile.module.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import Register from "../register/Register.jsx";
import WelcomeContent from "../../components/welcome/WelcomeContent.jsx";

export default function Profile() {

    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        // <div className="page-container">
        //     <h1>Profile</h1>
        //     {isAuth && user && <p>Welkom {user.username}</p>}
        //     <button onClick={logout}>Logout</button>
        // </div>
        <div className={styles.pageContainer}>
            <WelcomeContent />
                <div className={styles.profileData}>
                    <p>Hier komt ingelogde profiledata</p>
                </div>

            <button onClick={logout}>logout</button>
        </div>

    )
}