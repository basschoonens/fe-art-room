import styles from './UserArtworkDetails.module.css';
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {currencyFormat} from "../../helpers/currencyFormat.js";
import {dateFormat} from "../../helpers/dateFormat.js";
import Button from "../../components/button/Button.jsx";
import {useCart} from "../../context/CartContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import StarRating from "../../components/starRating/StarRating.jsx";

export default function UserArtworkDetails() {

    const navigate = useNavigate();
    const {addToCart} = useCart();
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState([]);
    const {isAuth} = useContext(AuthContext);
    const {id} = useParams();

    useEffect(() => {

        const controller = new AbortController();

        const fetchArtwork = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/artworks/${id}`, {signal: controller.signal});
                console.log(response.data)
                setArtwork(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        void fetchArtwork();

        return () => {
            controller.abort();
        };
    }, [id]);

    const fetchRatingsForArtwork = async () => {
        const abortController = new AbortController();

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/ratings/${id}/ratings`, {signal: abortController.signal});
            console.log(response.data);
            setRatings(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

        return () => {
            abortController.abort();
        };
    };

    return (
        <div className={styles.pageContainer}>
            {loading && <p>Loading...</p>}
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw</p>}
            {artwork &&
                <>
                <div className={styles.artworkImageContainer}>
                    <img className={styles.artworkImage} src={`http://localhost:8080/artworks/${artwork.id}/image`}
                         alt={artwork.title}/>
                </div>
                <div className={styles.artworkDetails}>
                    <h1>{artwork.title}</h1>
                    <p>{artwork.description}</p>
                    <p>Artist name: {artwork.artist}</p>
                    <p>Date created: {dateFormat(artwork.dateCreated)}</p>
                    {isAuth &&
                        <p>Selling price: {currencyFormat(artwork.sellingPrice)}</p>
                    }
                    {artwork.artworkType === 'painting' && (
                        <>
                            <p>Material: {artwork.paintingData.paintingMaterial}</p>
                            <p>Dimensions Width: {artwork.paintingData.paintingDimensionsWidthInCm} cm,
                                Height: {artwork.paintingData.paintingDimensionsHeightInCm} cm</p>
                        </>
                    )}
                    {artwork.artworkType === 'drawing' && (
                        <>
                            <p>Material: {artwork.drawingData.drawingMaterial}</p>
                            <p>Dimensions Width: {artwork.drawingData.drawingDimensionsWidthInCm} cm,
                                Height: {artwork.drawingData.drawingDimensionsHeightInCm} cm</p>
                        </>
                    )}
                    <p>Average rating for this artwork: {artwork.averageRating}</p>
                    <p>Total amount of ratings for this artwork: {artwork.totalAmountOfRatings}</p>
                    <p>{artwork.comments}</p>
                    <div className={styles.buttonsContainer}>
                        <Button type="button" text="Back to Gallery" onClick={() => navigate('/maingallery')}/>
                        <Button type="button" text="Add to Cart" onClick={() => addToCart(artwork)}/>
                        {artwork.totalAmountOfRatings > 0 && (
                            <Button type="button" text="View Ratings" onClick={fetchRatingsForArtwork}/>
                        )}
                    </div>
                </div>
                    {ratings.length > 0 && (
                        <div className={styles.ratingsContainer}>
                            <h2>Ratings</h2>
                            {ratings.map((rating, index) => (
                                <div key={index} className={styles.rating}>
                                    <StarRating rating={rating.rating} isInteractive={false} />
                                    <p>Comment: {rating.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            }
        </div>
    )
}
