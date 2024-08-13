import styles from './ArtistArtworkCard.module.css';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { currencyFormat } from "../../../../helpers/currencyFormat.js";

export default function ArtistArtworkCard({ artworkId, title, galleryBuyingPrice, salesPrice, averageRating, imageUrl }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const controller = new AbortController();


    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const jwt = localStorage.getItem('jwt');

            const config = {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.delete(`http://localhost:8080/artworks/artist/${artworkId}`, config, { signal: controller.signal });
            window.location.reload();
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
        return () => {
            controller.abort();
        }
    };

    return (
        <div className={styles.artworkCard}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <Link to={`${artworkId}`}>
                <span className={styles.artworkImage}>
                    <img src={imageUrl} alt={title} />
                </span>
            </Link>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>Gallery buying price: {currencyFormat(galleryBuyingPrice)}</p>
                <p>Gallery selling price: {currencyFormat(salesPrice)}</p>
                <p>Average review rating: {averageRating}</p>
            </div>
            <div className={styles.iconsContainer}>
                <span className={`${styles.icon} ${styles.iconEdit}`} onClick={() => navigate(`/editartwork/${artworkId}`)}>
                    <FaEdit />
                </span>
                <span className={`${styles.icon} ${styles.iconDelete}`} onClick={handleDelete}>
                    <FaTrashAlt />
                </span>
            </div>
        </div>
    );
}