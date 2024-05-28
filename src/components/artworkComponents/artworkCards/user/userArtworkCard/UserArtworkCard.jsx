// import styles from './UserArtworkCard.module.css';
// import React, {useContext} from 'react';
// import {AuthContext} from "../../../../../context/AuthContext.jsx";
// import {Link} from "react-router-dom";
//
// export default function UserArtworkCard({id, title, artist, imageUrl}) {
//
//     const {isAuth} = useContext(AuthContext)
//
//     return (
//         <div className={styles.artworkCard}>
//             <Link to={`${id}`}>
//                 <span className={styles.artworkImage}>
//                     <img src={imageUrl} alt={title}/>
//                 </span>
//             </Link>
//             <div className={styles.artworkDetails}>
//                 <h3>{title}</h3>
//                 <p>By {artist}</p>
//             </div>
//             {isAuth && (
//                 <div className={styles.iconsContainer}>
//                     <span className={styles.icon}>⭐</span>
//                     <span className={styles.icon}>🛒</span>
//                 </div>
//             )}
//         </div>
//     );
// }

import styles from './UserArtworkCard.module.css';
import React, {useContext} from 'react';
import {AuthContext} from "../../../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import RatingModal from "../../../../ratings/ratingsModal/RatingModal.jsx";
import axios from "axios";

export default function UserArtworkCard({id, title, artist, imageUrl, rating}) {

    const {isAuth} = useContext(AuthContext)
    const [isRatingModalOpen, setIsRatingModalOpen] = React.useState(false);

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
    }

    const closeRatingModal = () => {
        setIsRatingModalOpen(false);
    }

    const handleRatingSubmit = (rating, comment) => {
        console.log(rating, comment);
        async function sendRating() {
            try {
                const jwt = localStorage.getItem('jwt');

                const config = {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'application/json'
                    }
                };

                const data = {
                    rating,
                    comment
                };

                await axios.post(`http://localhost:8080/ratings/${id}/ratings`, data, config);
            } catch (error) {
                console.log(error);
            }
        }
        void sendRating();
        setIsRatingModalOpen(false);
    }

    return (
        <div className={styles.artworkCard}>
            <Link to={`${id}`}>
                <span className={styles.artworkImage}>
                    <img src={imageUrl} alt={title}/>
                </span>
            </Link>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>By {artist}</p>
                <p>Average rating: {rating}</p>
            </div>
            {isAuth && (
                <div className={styles.iconsContainer}>
                    <span className={styles.icon} onClick={openRatingModal}>⭐</span>
                    <span className={styles.icon}>🛒</span>
                </div>
            )}
            <RatingModal
                isOpen={isRatingModalOpen}
                onRequestClose={closeRatingModal}
                onSubmitReview={handleRatingSubmit}
            />
        </div>
    );
}