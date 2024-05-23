import React from 'react';
import styles from './UserModalTest.module.css';

export default function UserModalTest({
                                          title,
                                          artist,
                                          artworkType,
                                          averageRating,
                                          dateCreated,
                                          description,
                                          edition,
                                          imageUrl,
                                          paintingData,
                                          sellingPrice,
                                          onClose
                                      }) {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <img src={imageUrl} alt={title}/>
                <div className={styles.artworkDetails}>
                    <h2>{title}</h2>
                    <p>By {artist}</p>
                    <p>Type: {artworkType}</p>
                    <p>Rating: {averageRating}</p>
                    <p>Created on: {dateCreated}</p>
                    <p>Description: {description}</p>
                    <p>Edition: {edition}</p>
                    {paintingData && (
                        <>
                            <p>Material: {paintingData.paintingMaterial}</p>
                            <p>Dimensions: {paintingData.paintingDimensionsWidthInCm} x {paintingData.paintingDimensionsHeightInCm} cm</p>
                            <p>Surface: {paintingData.paintingSurface}</p>
                        </>
                    )}
                    <p>Price: ${sellingPrice}</p>
                </div>
            </div>
        </div>
    );
}