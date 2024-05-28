import styles from './UserArtworkCard.module.css';
import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";


export default function UserArtworkCard({id, title, artist, imageUrl}) {

    const {isAuth} = useContext(AuthContext)

    return (
        <div className={styles.artworkCard}>
            <Link to={`${id}`}>
                <span className={styles.artworkImage}>
                    <img src={imageUrl} alt={title}/>
                </span>
            </Link>
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
        </div>
    );
}