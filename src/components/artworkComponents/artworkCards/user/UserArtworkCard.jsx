import styles from './UserArtworkCard.module.css';
import React, {useContext} from 'react';
import {AuthContext} from "../../../../context/AuthContext.jsx";
import {useState} from "react";
import UserArtworkDetailsModal from "../../../artworkComponents/artworksModals/UserArtworkDetailsModal.jsx";


export default function UserArtworkCard({ title, artist, imageUrl }) {
    const { isAuth } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className={styles.artworkCard}>
                <img className={styles.artworkImage} src={imageUrl} alt={title} onClick={handleOpenModal}/>
                <div className={styles.artworkDetails}>
                    <h3 className={styles.artworkTitle} onClick={handleOpenModal}>{title}</h3>
                    <p>By {artist}</p>
                </div>
                {isAuth && (
                    <div className={styles.iconsContainer}>
                        <span className={styles.icon}>⭐</span>
                        <span className={styles.icon}>🛒</span>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <UserArtworkDetailsModal
                    title={title}
                    artist={artist}
                    imageUrl={imageUrl}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}