import styles from './Navigation.module.css';
import Logo from '../logo/Logo.jsx';
import { NavLink, useNavigate} from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

export default function Navigation() {

    const navigate = useNavigate();
    const {isAuth,user} = useContext(AuthContext);

    return (
        <nav>
            <div className={styles.navbar}>
                <Logo/>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/maingallery">For artlovers</NavLink>
                    </li>
                    {isAuth && (
                        <li>
                            <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                     to="/artistgallery">For
                                artists</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/about">About the gallery</NavLink>
                    </li>
                </ul>
                <ul className={styles.iconLinks}>
                    {/*TODO Checken of dit de manier is om een slechts Artist weer te geven als een artist is ingelogd*/}
                    <li>
                        {isAuth && user.authority === 'ROLE_ARTIST' ? (
                            <FaShoppingCart onClick={() => navigate("/shoppingcart")} className={styles.icon}/>
                        ) : (
                            <FaShoppingCart onClick={() => navigate("/login")} className={styles.icon}/>
                        )}
                    </li>
                    <li>
                        {isAuth ? (
                            <FaUser onClick={() => navigate("/profile")} className={styles.icon} />
                        ) : (
                            <FaUser onClick={() => navigate("/login")} className={styles.icon} />
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}