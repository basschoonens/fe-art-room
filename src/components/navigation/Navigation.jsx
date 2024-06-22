import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import Logo from '../logo/Logo.jsx';
import styles from './Navigation.module.css';
import hamburgerStyles from "../hamburgerMenu/HamburgerMenu.module.css";

const Navigation = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className={styles.navbar}>
                <Logo />
                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/maingallery">For artlovers</NavLink>
                    </li>
                    {isAuth && (user.authority === "ROLE_ARTIST" || user.authority === "ROLE_ADMIN") && (
                        <li>
                            <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.defaultLink}
                                     to="/artistgallery">For artists</NavLink>
                        </li>
                    )}
                    {isAuth && user.authority === "ROLE_ADMIN" && (
                        <li>
                            <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.defaultLink}
                                     to="/admin">For admin</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/about">About the gallery</NavLink>
                    </li>
                </ul>
                <ul className={styles.iconLinks}>
                    <li>
                        {isAuth ? (
                            <FaShoppingCart onClick={() => navigate("/shoppingcart")} className={styles.icon} />
                        ) : (
                            <FaShoppingCart onClick={() => navigate("/login")} className={styles.icon} />
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
                <div className={`${hamburgerStyles.menuIcon} ${isMenuOpen ? hamburgerStyles.open : ''}`} onClick={toggleMenu}>
                    <div className={hamburgerStyles.bar}></div>
                    <div className={hamburgerStyles.bar}></div>
                    <div className={hamburgerStyles.bar}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;