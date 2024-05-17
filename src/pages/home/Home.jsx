import styles from './Home.module.css';
import artist from '../../assets/artist.jpg';
import curator from '../../assets/curator.jpg'
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <section>
                HERO SECTION
            </section>
            <section className={styles.artistContainer}>
                <span className={styles.toArtistImage}>
                    <img id="artist-image" src={artist} alt="gallery image"/>
                    <Button id={styles.artistButton} text="For artists" type="button"
                            onClick={() => navigate("/artistgallery")}/>
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
