import React from 'react';
import styles from './UserArtworkDetailsModal.module.css';

export default function UserArtworkDetailsModal({ title, artist, imageUrl, onClose }) {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <img src={imageUrl} alt={title} />
                <h2>{title}</h2>
                <p>By {artist}</p>
                {/* Add more detailed information about the artwork here */}
                // add data like material, size, price etc.
            </div>
        </div>
    );
}
