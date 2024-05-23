import React from 'react';
import styles from './UserArtworkDetailsModal.module.css';

export default function UserArtworkDetailsModal({ closeModal, content }){
    const { title, artist, imageUrl } = content;

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <img src={imageUrl} alt={title} className={styles.modalImage} />
                <div className={styles.modalDetails}>
                    <h2>{title}</h2>
                    <p>By {artist}</p>
                </div>
            </div>
        </div>
    );
}
