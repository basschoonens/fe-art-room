import './Navigation.css';
import logo from '../../assets/logo-the-art-room-no-background.png';
import {NavLink} from "react-router-dom";


export default function Navigation() {
    return (
        <nav>
            <div className="navbar">
                <span className="navbar-logo-img">
                    <img src={logo} alt="The Art Room Logo"/>
                </span>
                <span className="navbar-title"><span/>The Art Room</span>
                <ul className="nav-links">
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}
                                 to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"} to="/newpost">New
                            Post</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}
                                 to="/overview">Overview</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}