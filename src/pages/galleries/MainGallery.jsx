import styles from './MainGallery.module.css';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserArtworkCard from "../../components/artworkComponents/artworkCards/user/UserArtworkCard.jsx";
import shuffleArray from "../../helpers/shuffleArray.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import formatRating from "../../helpers/formatRating.js";

export default function MainGallery() {

    const {isAuth, user} = useContext(AuthContext);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const artworksPerPage = 6;

    useEffect(() => {

        const controller = new AbortController();

        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/artworks`, { signal: controller.signal });
                console.log(response.data)
                const shuffledArtworks = shuffleArray(response.data);
                setArtworks(shuffledArtworks);
                console.log(shuffledArtworks)
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        void fetchArtworks();
        return () => {
            controller.abort();
        };
    }, []);


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const startIndex = (currentPage - 1) * artworksPerPage;
    const endIndex = Math.min(currentPage * artworksPerPage, artworks.length);

    const currentArtworks = artworks.slice(startIndex, endIndex);

    useEffect(() => {
        if (currentArtworks.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentArtworks, currentPage]);

    return (
        <>
            <div className={styles.pageContainer}>
                <h1>Main Gallery</h1>
                {isAuth ? <p>Welcome {user.username}! Please leave a review and comment of the best art you find here</p> :
                    <p>For more information on prices, and to leave comments and reviews please register or login</p>}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!loading && !error && artworks.length === 0 && <p>No artworks found</p>}
                <div>
                    <div className={styles.cardContainer}>
                        {currentArtworks.map(artwork => (
                            <UserArtworkCard
                                key={artwork.artworkId}
                                artworkId={artwork.artworkId}
                                title={artwork.title}
                                artist={artwork.artist}
                                rating={formatRating(artwork.averageRating)}
                                imageUrl={`http://localhost:8080/artworks/${artwork.artworkId}/image`}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button onClick={prevPage} disabled={currentPage === 1} text="Previous"/>
                    <Button onClick={nextPage} disabled={endIndex === artworks.length} text="Next" />
                </div>
            </div>
        </>
    )
}
