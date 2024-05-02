import './Navigation.css';
import logo from '../../assets/logo-the-art-room-no-background.png';
import {NavLink} from "react-router-dom";
import shoppingCart from '../../assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg';
import profile from '../../assets/person_FILL0_wght400_GRAD0_opsz24.svg';


export default function Navigation() {
    return (
        <nav>
            <div className="navbar">
                <span className="navbar-logo-img">
                    <img src={logo} alt="The Art Room Logo"/>
                </span>
                <ul className="nav-links">
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}
                                 to="/">For artlovers</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"} to="/newpost">For artists</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "default-link"}
                                 to="/overview">About the gallery</NavLink>
                    </li>
                </ul>
                {/*TODO Deze icons nog in kleur aanpassen*/}
                <ul className="icon-links">
                    <li>
                        <img src={shoppingCart} alt="Shopping Cart"/>
                    </li>
                    <li>
                        <img src={profile} alt="Profile"/>
                    </li>
                </ul>
            </div>
        </nav>
    );
}