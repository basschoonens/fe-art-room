import styles from './Navigation.module.css';
import Logo from '../logo/Logo.jsx';
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navigation() {
    return (
        <nav>
            <div className={styles.navbar}>
                <Logo/>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/maingallery">For artlovers</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink} to="/artistgallery">For
                            artists</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/about">About the gallery</NavLink>
                    </li>
                </ul>
                <ul className={styles.iconLinks}>
                    <li>
                        <FaShoppingCart className={styles.icon}/>
                    </li>
                    <li>
                        <FaUser className={styles.icon}/>
                    </li>
                </ul>
            </div>
        </nav>
    );
}