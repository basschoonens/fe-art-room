import styles from './LeftReviewsForArtist.module.css';
import Button from "../../components/button/Button.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import formatRating from "../../helpers/formatRating.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function LeftReviewsForArtist() {

    const [reviews, setReviews] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const jwt = localStorage.getItem('jwt');

        const controller = new AbortController();

        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        };

        const fetchRatingsList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/ratings/artist`, config, {signal: controller.signal});
                const groupedReviews = groupByArtworkTitle(response.data);
                setReviews(groupedReviews);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setReviews({});
                } else {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRatingsList();

        return () => {
            controller.abort();
        }

    }, []);

    const groupByArtworkTitle = (reviews) => {
        return reviews.reduce((acc, review) => {
            acc[review.artworkTitle] = acc[review.artworkTitle] || [];
            acc[review.artworkTitle].push(review);
            return acc;
        }, {});
    };

    const handleDelete = async (artworkId, ratingId) => {
        const jwt = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            await axios.delete(`http://localhost:8080/ratings/artist/${artworkId}/${ratingId}`, config);
            setReviews((prevReviews) => {
                const updatedReviews = {...prevReviews};
                for (const title in updatedReviews) {
                    updatedReviews[title] = updatedReviews[title].filter(review => review.ratingId !== ratingId);
                    if (updatedReviews[title].length === 0) {
                        delete updatedReviews[title];
                    }
                }
                // If no reviews left, set to empty object
                if (Object.keys(updatedReviews).length === 0) {
                return updatedReviews;
                }
            });
        } catch (error) {
            setError(error)
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h2>Reviews for your artworks</h2>
            {loading && <p>Loading reviews...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className={styles.reviewsContainer}>
                {Object.keys(reviews).length === 0 &&
                    <div>
                        <p>No reviews found for you yet.</p>
                        <p>Ask your customers to leave a review on your artworks!</p>
                    </div>
                }
                {Object.keys(reviews).map((artworkTitle) => (
                    <div key={artworkTitle} className={styles.reviewGroup}>
                        <h3 className={styles.artworkTitle}>Reviews found for: {artworkTitle}</h3>
                        <div className={styles.reviewWrapper}>
                            {Array.isArray(reviews[artworkTitle]) && reviews[artworkTitle].map((review) => (
                                <div key={review.ratingId} className={styles.review}>
                                    <p>Review: {formatRating(review.rating)}</p>
                                    <p>Comment: {review.comment}</p>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(review.artworkId, review.ratingId)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" text="Back to profile" onClick={() => navigate("/profile")}/>
        </div>
    );
}