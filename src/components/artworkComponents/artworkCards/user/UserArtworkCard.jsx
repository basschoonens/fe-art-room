// import styles from './UserArtworkCard.module.css';
// import React, {useContext, useState} from 'react';
// import {AuthContext} from "../../../../../context/AuthContext.jsx";
// import {Link} from "react-router-dom";
// import RatingModal from "../../../../ratings/ratingsModal/RatingModal.jsx";
// import axios from "axios";
// import {useCart} from "../../../../../context/CartContext.jsx";
// import { FaStar, FaShoppingCart } from 'react-icons/fa'
//
// export default function UserArtworkCard({artworkId, title, artist, imageUrl, rating}) {
//
//     console.log('UserArtworkCard', artworkId, title, artist, imageUrl, rating);
//
//     const {isAuth} = useContext(AuthContext)
//     const {addToCart} = useCart();
//     const [isRatingModalOpen, setIsRatingModalOpen] = React.useState(false);
//     const [cartClicked, setCartClicked] = useState(false);
//
//     const openRatingModal = () => {
//         setIsRatingModalOpen(true);
//     }
//
//     const closeRatingModal = () => {
//         setIsRatingModalOpen(false);
//     }
//
//     const handleAddToCart = () => {
//         console.log(artworkId)
//         addToCart({ artworkId });
//         setCartClicked(true); // Mark the cart as clicked// Add the item to cart
//         console.log("Item added to cart:", { artworkId, title, artist, imageUrl, rating }); // Log the added item
//     }
//
//     const handleRatingSubmit = (rating, comment) => {
//         console.log(rating, comment);
//         async function sendRating() {
//             try {
//                 const jwt = localStorage.getItem('jwt');
//
//                 const config = {
//                     headers: {
//                         'Authorization': `Bearer ${jwt}`,
//                         'Content-Type': 'application/json'
//                     }
//                 };
//
//                 const data = {
//                     rating,
//                     comment
//                 };
//
//                 await axios.post(`http://localhost:8080/ratings/user/${artworkId}`, data, config);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         void sendRating();
//     }
//
//     return (
//         <div className={styles.artworkCard}>
//             <Link to={`${artworkId}`}>
//                 <span className={styles.artworkImage}>
//                     <img src={imageUrl} alt={title}/>
//                 </span>
//             </Link>
//             <div className={styles.artworkDetails}>
//                 <h3>{title}</h3>
//                 <p>By {artist}</p>
//                 <p>Average rating: {rating}</p>
//             </div>
//             {isAuth && (
//                 <div className={styles.iconsContainer}>
//                     <span className={`${styles.icon} ${styles.iconStar}`} onClick={openRatingModal}>
//                         <FaStar className={`${styles.icon} ${styles.iconStar}`}/>
//                     </span>
//                     <span className={`${styles.icon} ${styles.iconCart} ${cartClicked ? styles.clicked : ''}`}
//                           onClick={handleAddToCart}>
//                         <FaShoppingCart className={`${styles.icon} ${styles.iconCart}`}/>
//                     </span>
//                 </div>
//             )}
//             <RatingModal
//                 isOpen={isRatingModalOpen}
//                 onRequestClose={closeRatingModal}
//                 onSubmitReview={handleRatingSubmit}
//             />
//         </div>
//     );
// }

import styles from './UserArtworkCard.module.css';
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import RatingModal from "../../../ratings/ratingsModal/RatingModal.jsx";
import axios from "axios";
import { useCart } from "../../../../context/CartContext.jsx";
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function UserArtworkCard({ artworkId, title, artist, imageUrl, rating }) {

    console.log('UserArtworkCard', artworkId, title, artist, imageUrl, rating);

    const { isAuth } = useContext(AuthContext);
    const { addToCart } = useCart();
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [iconClicked, toggleIconClicked] = useState(false);

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
    };

    const closeRatingModal = () => {
        setIsRatingModalOpen(false);
    };

    const handleAddToCart = () => {
        addToCart({ artworkId });
        toggleIconClicked(true); // Mark the cart as clicked
        console.log("Item added to cart:", { artworkId, title, artist, imageUrl, rating }); // Log the added item
    };

    const handleRatingSubmit = async (rating, comment) => {
        console.log(rating, comment);
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

            await axios.post(`http://localhost:8080/ratings/user/${artworkId}`, data, config);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.artworkCard}>
            <Link to={`${artworkId}`}>
                <span className={styles.artworkImage}>
                    <img src={imageUrl} alt={title} />
                </span>
            </Link>
            <div className={styles.artworkDetails}>
                <h3>{title}</h3>
                <p>By {artist}</p>
                <p>Average rating: {rating}</p>
            </div>
            {isAuth && (
                <div className={styles.iconsContainer}>
                    <span className={`${styles.icon} ${styles.iconStar}`} onClick={openRatingModal}>
                        <FaStar />
                    </span>
                    <span className={`${styles.icon} ${styles.iconCart} ${iconClicked ? styles.clicked : ''}`} onClick={handleAddToCart}>
                        <FaShoppingCart />
                    </span>
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