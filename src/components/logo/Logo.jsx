import './Logo.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/TheArtRoom_light-resized.png';


export default function Logo() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <span className="navbar-logo-img" onClick={handleLogoClick}>
            <img src={logo} alt="The Art Room Logo"/>
        </span>
    );
}