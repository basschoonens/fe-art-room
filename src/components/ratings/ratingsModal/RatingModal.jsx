import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './RatingModal.module.css';

export default function ReviewModal({ isOpen, onRequestClose, onSubmitReview }) {
    const { register, handleSubmit } = useForm();
    const [rating, setRating] = useState(0);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = (data) => {
        onSubmitReview(rating, data.comment);
        setSuccessMessage(true);
        setTimeout(() => {
            setSuccessMessage(false);
            onRequestClose();
            // reset();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={() => { setSuccessMessage(false); onRequestClose(); setRating(0); }}>
                    &times;
                </button>
                <h2>Leave a Review</h2>
                {successMessage ? (
                    <p className={styles.successMessage}>Review submitted successfully!</p>
                ) : (
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
                        {/*TODO Textarea doesn't store anything after pressing Enter in the input field, error is Assertion failed: Input argument is not an HTMLInputElement, perhaps refactor to not use React Hook Form*/}
                        <textarea
                            {...register('comment')}
                            placeholder="Leave a comment..."
                            className={styles.comment}
                            name="comment"
                        />
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}