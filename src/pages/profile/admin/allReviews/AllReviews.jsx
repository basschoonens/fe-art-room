import styles from './AllReviews.module.css';
import WelcomeContent from "../../../../components/welcomeContentBar/WelcomeContent.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import formatRating from "../../../../helpers/formatRating.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";


export default function AllReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                const response = await axios.get(`http://localhost:8080/ratings/admin`, config, {signal: controller.signal});
                console.log(response.data);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error); // Log the error
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatingsList();

        return () => {
            controller.abort();
        }

    }, []);

    const handleDelete = async (ratingId) => {
        const jwt = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            await axios.delete(`http://localhost:8080/ratings/admin/${ratingId}`, config);
            setReviews(reviews.filter(rating => rating.ratingId !== ratingId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };
    const groupedReviews = reviews.reduce((acc, review) => {
        if (!acc[review.artworkTitle]) {
            acc[review.artworkTitle] = [];
        }
        acc[review.artworkTitle].push(review);
        return acc;
    }, {});

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent/>
            <div className={styles.reviewData}>
                <h2>All Reviews</h2>
                {loading && <p>Loading reviews...</p>}
                {error && <p>Error loading reviews: {error.message}</p>}
                {Object.keys(groupedReviews).length === 0 && <p>No reviews found for you yet. Please leave one on an artwork you enjoy!</p>}
                {Object.keys(groupedReviews).map(artworkTitle => (
                    <div key={artworkTitle} className={styles.reviewsTitle}>
                        <h3>{artworkTitle}</h3>
                        <div className={styles.reviewsContainer}>
                            {groupedReviews[artworkTitle].map((review) => (
                                <div key={review.ratingId} className={styles.review}>
                                    <p>Rating: {formatRating(review.rating)}</p>
                                    <p>Review: {review.comment}</p>
                                    <span className={styles.delete} onClick={() => handleDelete(review.ratingId)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}