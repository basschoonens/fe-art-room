import styles from './Home.module.css';
import artist from '../../assets/artist.jpg';
import curator from '../../assets/curator.jpg'
import user from '../../assets/user.jpg';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

export default function Home() {

    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleArtistClick = () => {
        {isAuth ? navigate("/artistgallery") : navigate("/login")}
    }

    return (
        <div className={styles.pageContainer}>
            <section>
                 <span className={styles.toGalleryImage}>
                    <img id="gallery-image" src={user} alt="gallery image"/>
                    <Button id={styles.galleryButton} text="For artlovers" type="button"
                            onClick={() => navigate("/maingallery")}/>
                </span>
            </section>
            <section className={styles.artistContainer}>
                <span className={styles.toArtistImage}>
                    <img id="artist-image" src={artist} alt="artist image"/>
                    <Button id={styles.artistButton} text="For artists" type="button"
                            onClick={handleArtistClick}/>
                </span>
            </section>
            <section className={styles.curatorContainer}>
                    <span className={styles.toCuratorImage}>
                        <img id="curator-image" src={curator} alt="curator image"/>
                        <Button id={styles.curatorButton} text="Contact the curator" type="button"
                                onClick={() => navigate("/about")}/>
                    </span>
            </section>
        </div>
    )
}
