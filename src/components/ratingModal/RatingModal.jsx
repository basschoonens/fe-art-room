import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RatingModal.module.css';
import StarRating from '../starRating/StarRating.jsx';
import error from "eslint-plugin-react/lib/util/error.js";

export default function ReviewModal({ isOpen, onRequestClose, onSubmitReview }) {
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        if (error) setError(null);
    };

    const onSubmit = (data) => {
        if (rating === 0) {
            setError('Please select a rating before submitting.');
            return;
        }

        onSubmitReview(rating, data.comment);
        setSuccessMessage(true);
        setTimeout(() => {
            setSuccessMessage(false);
            onRequestClose();
            reset();
            setRating(0);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={() => {
                    setSuccessMessage(false);
                    setError(null);
                    onRequestClose();
                    setRating(0);
                }}>
                    &times;
                </button>
                <h2>Leave a Review</h2>
                {successMessage ? (
                    <p className={styles.successMessage}>Review submitted successfully!</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <p className={styles.error}>{error}</p>}
                        <StarRating rating={rating} onRatingChange={handleRatingChange} isInteractive={true}
                                    customClassName={styles.largeStars}/>
                        <textarea
                            {...register('comment')}
                            placeholder="Leave a comment..."
                            className={styles.comment}
                            name="comment"
                        />
                        <button type="submit" className={styles.submitButton} disabled={rating === 0}>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}