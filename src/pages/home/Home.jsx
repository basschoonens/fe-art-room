import HomeCSS from './Home.module.css';
import artist from '../../assets/artist.jpg';
import curator from '../../assets/curator.jpg'
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();


    return (
        <div className={HomeCSS.pageContainer}>
            <section>
                HERO SECTION
            </section>
            <section className={HomeCSS.artistContainer}>
                <span className={HomeCSS.toArtistImage}>
                    <img id="artist-image" src={artist} alt="gallery image"/>
                    <Button id={HomeCSS.artistButton} text="For artists" type="button"
                            onClick={() => navigate("/artist")}/>
                </span>
            </section>
            <section className={HomeCSS.curatorContainer}>
                    <span className={HomeCSS.toCuratorImage}>
                        <img id="curator-image" src={curator} alt="curator image"/>
                        <Button id={HomeCSS.curatorButton} text="Contact the curator" type="button"
                                onClick={() => navigate("/about")}/>
                    </span>
            </section>
        </div>
    )
}
