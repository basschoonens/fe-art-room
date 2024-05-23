import styles from './ArtistGallery.module.css';
import Button from "../../components/button/Button.jsx";
import {useEffect} from "react";
import axios from "axios";
import {FaEdit, FaTrash} from "react-icons/fa";
import ArtistArtworkCard from "../../components/artworkComponents/artworkCards/artist/ArtistArtworkCard.jsx";

export default function ArtistGallery() {

    useEffect(() => {
        // fetch artworks by artist
        const fetchArtistArtworks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/artworks/artist`);
                const data = response.data;
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1>Artist Gallery</h1>
            <div className={styles.buttonsContainer}>
                <Button type="button"  text="Add new artwork" />
                <Button type="button" text="Find your reviews" />
            </div>
            <section className={styles.sortingBar}>
                        <ul className={styles.sortingLinks}>
                            <li>Sort by:</li>
                            <li>Type</li>
                            <li>Rating</li>
                            <li>Price</li>
                        </ul>
            </section>
            <section className={styles.artworksContainer}>
                <div className={styles.artworkCard}>
                    <ArtistArtworkCard
                        title="Artwork title"
                        imageUrl="https://via.placeholder.com/150"
                    />
                </div>
            </section>
        </div>
    )
}
