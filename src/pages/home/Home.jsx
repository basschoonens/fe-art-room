import './Home.css';
import artist from '../../assets/artist.jpg';
import curator from '../../assets/curator.jpg'
import Button from "../../components/button/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();


    return (
        <div className="page-container">
            <section>
                HERO SECTION
            </section>
            <section className="gallery-info">
                    <span className="to-artist-image"><img id="artist" src={artist} alt="gallery image"/></span>
                    <Button text="For artists" type="button" onClick={() => navigate("/artist")}/>
            </section>
            <section className="curator-info">
                <div className="image-container">
                    <span className="contact-curator-image"><img id="curator" src={curator} alt="curator image"/></span>
                    {/*TODO - Contact formulier & pagina maken en linken*/}
                    <Button text="Contact the curator" type="button" onClick={() => navigate("/about")}/>
                </div>
            </section>
        </div>
    )
}
