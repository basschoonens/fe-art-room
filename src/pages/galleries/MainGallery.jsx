import styles from './MainGallery.module.css';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserArtworkCard from "../../components/artworkComponents/artworkCards/user/UserArtworkCard.jsx";
import shuffleArray from "../../helpers/shuffleArray.js";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function MainGallery() {

    const { isAuth } = useContext(AuthContext);
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
                const shuffledArtworks = shuffleArray(response.data);
                setArtworks(shuffledArtworks);
                console.log(shuffledArtworks)
            } catch (error) {
                setError(error);
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
                <p>For more information on prices, and to leave comments and reviews please register or login</p>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!loading && !error && artworks.length === 0 && <p>No artworks found</p>}
                <div>
                    <div className={styles.cardContainer}>
                        {currentArtworks.map(art => (
                            <UserArtworkCard
                                key={art.id}
                                title={art.title}
                                artist={art.artist}
                                imageUrl={`http://localhost:8080/artworks/${art.id}/image`}
                            />
                        ))}
                    </div>
                </div>
                    <div className={styles.buttonsContainer}>
                        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                        <button onClick={nextPage}>Next</button>
                    </div>
            </div>
        </>
    )
}
