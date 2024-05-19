import styles from './Profile.module.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import RegisterNew from "../../components/register-new/RegisterNew.jsx";

export default function Profile() {

    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        // <div className="page-container">
        //     <h1>Profile</h1>
        //     {isAuth && user && <p>Welkom {user.username}</p>}
        //     <button onClick={logout}>Logout</button>
        // </div>
        <div className={styles.pageContainer}>
            <div className={styles.welcomeContainer}>
                <span ><img id={styles.profileImage} src="https://via.placeholder.com/100" alt="profile-image"/></span>
                <h1 className={styles.welcomeMessage}>Welcome {user.username} !</h1>
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
            {isAuth ?
                <div className={styles.register}>
                    <RegisterNew/>
                </div> :
                <div className={styles.profileData}>
                </div>
            }
            <button onClick={logout}>logout</button>
        </div>

    )
}