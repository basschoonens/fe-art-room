import styles from './ArtistGallery.module.css';
import Button from "../../components/button/Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {FaEdit, FaTrash} from "react-icons/fa";
import ArtistArtworkCard from "../../components/artworkComponents/artworkCards/artist/ArtistArtworkCard.jsx";
import UserArtworkCard from "../../components/artworkComponents/artworkCards/user/UserArtworkCard.jsx";

export default function ArtistGallery() {


    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtistArtworks = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8080/artworks/user/artworks`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const data = response.data;
                console.log(data);
                setArtworks(data)
            } catch (error) {
                console.error(error);
            }
        }
        void fetchArtistArtworks();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1>Artist Gallery</h1>
            <div className={styles.buttonsContainer}>
                <Button type="button" text="Add new artwork"/>
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
            <div className={styles.cardContainer}>
                {artworks.map((artwork) => (
                        <ArtistArtworkCard
                            key={artwork.id}
                            title={artwork.title}
                            price={artwork.sellingPrice}
                            imageUrl={`http://localhost:8080/artworks/${artwork.id}/image`}
                        />
                ))}
            </div>
        </div>
    );
}
