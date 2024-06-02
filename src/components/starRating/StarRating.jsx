import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ rating, onRatingChange, isInteractive = false, customClassName = '' }) => {
    const handleClick = (newRating) => {
        if (isInteractive && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className={`${styles.starRating} ${customClassName}`}>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={index < rating ? styles.starFilled : styles.starEmpty}
                    onClick={() => handleClick(index + 1)}
                    style={{ cursor: isInteractive ? 'pointer' : 'default', fontSize: isInteractive ? 'var(--font-size-xlarge)' : 'var(--font-size-large)' }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;