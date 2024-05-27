import React, {useEffect, useState} from 'react';
import styles from './UserArtworkDetailsModal.module.css';
import axios from "axios";
import {useParams} from "react-router-dom";

export default function UserArtworkDetailsModal(closeModal) {

    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        async function fetchArtwork() {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/artworks/${id}`);
                setArtwork(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        void fetchArtwork();

        // Clean up function
        return () => {
            // Cleanup code if needed
        };
    }, [id]);

    return (
        <div className={styles.modalBackdrop} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>×</button>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <>
                        <img src={`http://localhost:8080/artworks/${id}/image`} alt={`Artwork ${id}`} />
                        <h2>{artwork && artwork.title}</h2>
                        <p>By {artwork && artwork.artist}</p>
                        {/* Additional artwork details */}
                    </>
                )}
            </div>
        </div>
    );
}
