import styles from './ArtistArtworkCard.module.css';
import React from 'react';
import {currencyFormat} from "../../../../helpers/currencyFormat.js";
import {Link} from "react-router-dom";

export default function ArtistArtworkCard({id, title, salesPrice, imageUrl}){


    return (
        <div className={styles.artworkCard}>
            <Link to={`${id}`}>
                <span className={styles.artworkImage}>
                <img src={imageUrl} alt={title}/>
                </span>
            </Link>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>Gallery selling price : {currencyFormat(salesPrice)}</p>
            </div>
        </div>
    );
}