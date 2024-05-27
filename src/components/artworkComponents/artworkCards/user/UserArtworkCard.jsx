import styles from './UserArtworkCard.module.css';
import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../../context/AuthContext.jsx";
import UserArtworkDetailsModal from "../../artworksModals/UserArtworkDetailsModal.jsx";
import {Link} from "react-router-dom";


export default function UserArtworkCard({id, title, artist, imageUrl}){

    const { isAuth } = useContext(AuthContext)
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.artworkCard} onClick={openModal}>
            <img src={imageUrl} alt={title}/>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>By {artist}</p>
            </div>
            {isAuth && (
                <div className={styles.iconsContainer}>
                    <span className={styles.icon}>⭐</span>
                    <span className={styles.icon}>🛒</span>
                </div>
            )}
            {isModalOpen && <UserArtworkDetailsModal id={id} onClose={closeModal}/>}
        </div>
    );
}