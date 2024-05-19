import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

export default function Profile() {

    const { user, isAuth, logout } = useContext(AuthContext);

    return (
        <div className="page-container">
            <h1>Profile</h1>
            {isAuth && user && <p>Welkom {user.username}</p>}
            <button onClick={logout}>Logout</button>
        </div>
    )
}