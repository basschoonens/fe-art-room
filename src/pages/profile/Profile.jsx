import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

export default function Profile() {

    const { user, isAuth } = useContext(AuthContext);

    return (
        <div className="page-container">
            <h1>Profile</h1>
            {isAuth && user && <p>Welkom {user.username}</p>}
        </div>
    )
}