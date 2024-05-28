import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './RatingModal.module.css';

export default function ReviewModal({ isOpen, onRequestClose, onSubmitReview }) {
    const { register, handleSubmit } = useForm();
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = (data) => {
        onSubmitReview(rating, data.comment);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onRequestClose}>
                    &times;
                </button>
                <h2>Leave a Review</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...register('comment')}
                        placeholder="Leave a comment..."
                        className={styles.comment}
                        name="comment"
                    />
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}