import styles from './ArtistArtworkCard.module.css';
import React from 'react';
import {currencyFormat} from "../../../../helpers/currencyFormat.js";



export default function ArtistArtworkCard({id, title, price, imageUrl}){


    return (
        <div className={styles.artworkCard}>
            <img src={imageUrl} alt={title}/>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>{currencyFormat(price)}</p>
            </div>
        </div>
    );
}