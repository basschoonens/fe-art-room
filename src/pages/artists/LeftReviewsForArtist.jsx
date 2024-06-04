import styles from './LeftReviewsForArtist.module.css';
import Button from "../../components/button/Button.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import formatRating from "../../helpers/formatRating.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

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
                const response = await axios.get(`http://localhost:8080/ratings/artist`, config, { signal: controller.signal });
                const groupedReviews = groupByArtworkTitle(response.data);
                setReviews(groupedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
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

    const groupByArtworkTitle = (reviews) => {
        return reviews.reduce((acc, review) => {
            acc[review.artworkTitle] = acc[review.artworkTitle] || [];
            acc[review.artworkTitle].push(review);
            return acc;
        }, {});
    };

    const handleDelete = async (artworkId) => {
        const jwt = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            await axios.delete(`http://localhost:8080/ratings/${artworkId}/ratings`, config);
            setReviews((prevReviews) => {
                const updatedReviews = { ...prevReviews };
                for (const title in updatedReviews) {
                    updatedReviews[title] = updatedReviews[title].filter(review => review.artworkId !== artworkId);
                    if (updatedReviews[title].length === 0) {
                        delete updatedReviews[title];
                    }
                }
                return updatedReviews;
            });
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className={styles.pageContainer}>
                <h2>Reviews for your artworks</h2>
                {loading && <p>Loading reviews...</p>}
                {error && <p>Error loading reviews: {error.message}</p>}
                <div className={styles.reviewsContainer}>
                    {Object.keys(reviews).length === 0 && <p>No reviews found for you yet. Please leave one on an artwork you enjoy!</p>}
                    {Object.keys(reviews).map((title) => (
                        <div key={title} className={styles.reviewGroup}>
                            <h3 className={styles.artworkTitle}>{title}</h3>
                            <div className={styles.reviewWrapper}>
                            {Array.isArray(reviews[title]) && reviews[title].map((review) => (
                                <div key={review.ratingId} className={styles.review}>
                                    <p className={styles.reviewTitle}>Artwork: {review.artworkTitle}</p>
                                    <p>Rating: {formatRating(review.rating)}</p>
                                    <p>Comment: {review.comment}</p>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(review.artworkId)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            <Button type="button" text="Back to profile" onClick={() => navigate("/profile")} />
        </div>
    );
}