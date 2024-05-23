import styles from './UserArtworkCard.module.css';
import React from 'react';

export default function UserCardTest({ title, artist, imageUrl, onClick }) {
    return (
        <div className={styles.artworkCard} onClick={onClick}>
            <img className={styles.artworkImage} src={imageUrl} alt={title} />
            <div className={styles.artworkDetails}>
                <h3 className={styles.artworkTitle}>{title}</h3>
                <p>By {artist}</p>
            </div>
        </div>
    );
}