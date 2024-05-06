import styles from './Logo.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/TheArtRoom_light-resized.png';

export default function Logo() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <span className={styles.navbarLogoImg} onClick={handleLogoClick}>
            <img src={logo} alt="The Art Room Logo"/>
        </span>
    );
}