import styles from './UserArtworkCard.module.css';
import React from 'react';


const UserArtworkCard = ({ title, artist, imageUrl }) => {
    return (
        <div className={styles.artworkCard}>
            <img src={imageUrl} alt={title}/>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>By {artist}</p>
            </div>
            <div className={styles.iconsContainer}>
                <span className={styles.icon}>⭐</span>
                <span className={styles.icon}>🛒</span>
            </div>
        </div>
    );
};

export default UserArtworkCard;