import styles from './UserArtworkDetails.module.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {currencyFormat} from "../../../helpers/currencyFormat.js";
import {dateFormat} from "../../../helpers/dateFormat.js";

export default function UserArtworkDetails() {

    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="page-container">
            {loading && <p>Loading...</p>}
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw</p>}
            {artwork &&
                <>
                    <h1>{artwork.title}</h1>
                    <p>{artwork.description}</p>
                    <p>Artist name : {artwork.artist}</p>
                    <p>Date created : {dateFormat(artwork.dateCreated)}</p>
                    <p>Selling price : {currencyFormat(artwork.sellingPrice)}</p>
                    <img src={`http://localhost:8080/artworks/${artwork.id}/image`} alt={artwork.title}/>
                    {artwork.artworkType === 'painting' && (
                        <>
                            <p>Material: {artwork.paintingData.paintingMaterial}</p>
                            <p>Dimensions Width: {artwork.paintingData.paintingDimensionsWidthInCm} cm, Height: {artwork.paintingData.paintingDimensionsHeightInCm} cm</p>
                        </>
                    )}
                    {artwork.artworkType === 'drawing' && (
                        <>
                            {/* Add drawing-specific details here */}
                        </>
                    )}
                    <p>Average rating for this artwork : {artwork.averageRating}</p>
                    <p>Total amount of ratings for this artwork : {artwork.totalAmountOfRatings}</p>
                    <p>{artwork.comments}</p>
                    <button type="button">Back</button>
                    <button type="button">Add to Shopping Cart</button>
                </>
            }
        </div>
    )
}