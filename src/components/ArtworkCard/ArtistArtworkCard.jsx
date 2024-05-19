import styles from './ArtistArtworkCard.module.css';
import React from 'react';
import {FaEdit, FaTrash} from "react-icons/fa";


const ArtistArtworkCard = ({ title, imageUrl, price }) => {
    return (
        <div className={styles.artworkCard}>
            <img src={imageUrl} alt={title}/>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>{price} €</p>
            </div>
            {/*TODO Only use react icons here*/}
            <div className={styles.iconsContainer}>
                    <FaEdit className={styles.icon}/>
                    <FaTrash className={styles.icon}/>
            </div>
        </div>
    );
};

export default ArtistArtworkCard;