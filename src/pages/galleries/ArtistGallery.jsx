import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './ArtistGallery.module.css';
import Button from "../../components/button/Button.jsx";
import ArtistArtworkCard from "../../components/artworkComponents/artworkCards/artist/ArtistArtworkCard.jsx";

export default function ArtistGallery() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState({ field: null, order: 'asc' });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchArtistArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8080/artworks/artist`, {
                    signal: abortController.signal,
                    headers: {
                        "Content-Type": `application/json`,
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

    const handleSort = (field) => {
        setSortCriteria(prev => {
            const newOrder = prev.field === field && prev.order === 'asc' ? 'desc' : 'asc';
            return { field, order: newOrder };
        });
    };

    const sortArtworks = (artworks, { field, order }) => {
        if (!field) return artworks;

        return artworks.slice().sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const sortedArtworks = sortArtworks(artworks, sortCriteria);

    return (
        <div className={styles.pageContainer}>
            <h1>Artist Gallery</h1>
            <div className={styles.buttonsContainer}>
                <Link to={'/artistgallery/addnewartwork'}><Button type="button" text="Add new artwork"/></Link>
                <Link to={'/artistgallery/leftreviews'}><Button type="button" text="Find your reviews"/></Link>
            </div>
            <section className={styles.sortingBar}>
                <ul className={styles.sortingLinks}>
                    <li>Sort by:</li>
                    <li onClick={() => handleSort('type')}
                        data-order={sortCriteria.field === 'type' ? sortCriteria.order : null}>
                        Type
                    </li>
                    <li onClick={() => handleSort('averageRating')}
                        data-order={sortCriteria.field === 'averageRating' ? sortCriteria.order : null}>
                        Rating
                    </li>
                    <li onClick={() => handleSort('sellingPrice')}
                        data-order={sortCriteria.field === 'sellingPrice' ? sortCriteria.order : null}>
                        Price
                    </li>
                </ul>
            </section>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while fetching the data. Please try again.</p>}
            <div className={styles.cardContainer}>
                {sortedArtworks.map((artwork) => (
                    <ArtistArtworkCard
                        key={artwork.artworkId}
                        artworkId={artwork.artworkId}
                        title={artwork.title}
                        averageRating={artwork.averageRating}
                        salesPrice={artwork.sellingPrice}
                        imageUrl={`http://localhost:8080/artworks/${artwork.artworkId}/image`}
                    />
                ))}
            </div>
        </div>
    );
}