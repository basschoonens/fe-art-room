import styles from './Navigation.module.css';
import Logo from '../logo/Logo.jsx';
import { NavLink } from "react-router-dom";
import shoppingCart from '../../assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg';
import profile from '../../assets/person_FILL0_wght400_GRAD0_opsz24.svg';

export default function Navigation() {
    return (
        <nav>
            <div className={styles.navbar}>
                <Logo/>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/">For artlovers</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink} to="/artist">For
                            artists</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}
                                 to="/about">About the gallery</NavLink>
                    </li>
                </ul>
                <ul className={styles.iconLinks}>
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