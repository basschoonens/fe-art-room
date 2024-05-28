import React, { useState } from 'react';
import styles from './RatingModal.module.css';

export default function ReviewModal({ isOpen, onRequestClose, onSubmitReview }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        onSubmitReview(rating, comment);
        onRequestClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onRequestClose}>
                    &times;
                </button>
                <h2>Leave a Review</h2>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={i < rating ? styles.starFilled : styles.starEmpty}
                            onClick={() => handleRatingChange(i + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    className={styles.comment}
                />
                <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
            </div>
        </div>
    );
}