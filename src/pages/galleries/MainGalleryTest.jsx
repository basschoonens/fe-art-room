import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import shuffleArray from "../../helpers/shuffleArray.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import ArtworkDataTest from "../../components/artworkComponents/ArtworkDataTest.jsx";
import styles from './MainGallery.module.css';

export default function MainGalleryTest() {
    const { isAuth } = useContext(AuthContext);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const artworksPerPage = 6;

    useEffect(() => {
        const controller = new AbortController();

        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/artworks`, { signal: controller.signal });
                const shuffledArtworks = shuffleArray(response.data);
                setArtworks(shuffledArtworks);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        void fetchArtworks();

        return () => {
            controller.abort();
        };
    }, []);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const startIndex = (currentPage - 1) * artworksPerPage;
    const endIndex = Math.min(currentPage * artworksPerPage, artworks.length);
    const currentArtworks = artworks.slice(startIndex, endIndex);

    useEffect(() => {
        if (currentArtworks.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentArtworks, currentPage]);

    return (
        <div className={styles.pageContainer}>
            <h1>Main Gallery</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && artworks.length === 0 && <p>No artworks found</p>}
            <div className={styles.cardContainer}>
                {currentArtworks.map((art) => (
                    <ArtworkDataTest
                        key={art.id}
                        artwork={art}
                    />
                ))}
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}