import styles from './ArtistGallery.module.css';
import Button from "../../components/button/Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import ArtistArtworkCard from "../../components/artworkComponents/artworkCards/artist/ArtistArtworkCard.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function ArtistGallery() {

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortController = new AbortController();

        const fetchArtistArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8080/artworks/user/artworks`, {
                    signal: abortController.signal,
                    headers: {
                        "Content-Type": `application/json"`,
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const data = response.data;
                console.log(data);
                setArtworks(data)
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        void fetchArtistArtworks();
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1>Artist Gallery</h1>
            <div className={styles.buttonsContainer}>
                <Link to={'/artistgallery/addnewartwork'}><Button type="button" text="Add new artwork"/></Link>
                <Button type="button" text="Find your reviews"/>
            </div>
            <section className={styles.sortingBar}>
                <ul className={styles.sortingLinks}>
                    <li>Sort by:</li>
                    <li>Type</li>
                    <li>Rating</li>
                    <li>Price</li>
                </ul>
            </section>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while fetching the data. Please try again.</p>}
            <div className={styles.cardContainer}>
                {artworks.map((artwork) => (
                        <ArtistArtworkCard
                            key={artwork.id}
                            id={artwork.id}
                            title={artwork.title}
                            salesPrice={artwork.sellingPrice}
                            imageUrl={`http://localhost:8080/artworks/${artwork.id}/image`}
                        />
                ))}
            </div>
        </div>
    );
}
