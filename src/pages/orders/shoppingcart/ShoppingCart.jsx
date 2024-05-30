import React, {useEffect, useState} from 'react';
import { useCart } from '../../../context/CartContext.jsx';
import axios from "axios";
import {Link} from "react-router-dom";

const ShoppingCart = () => {
    const { cart, removeFromCart } = useCart();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const controller = new AbortController();

    useEffect(() => {
        const fetchArtworkDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const artworkDetails = await Promise.all(
                    // TODO check if this is necessary
                    cart.map(async (item) => {
                        const response = await axios.get(`http://localhost:8080/artworks/${item.id}`, { signal: controller.signal });
                        return response.data;
                    })
                );
                setArtworks(artworkDetails);
            } catch (error) {
                setError(error);
                console.error('Error fetching artwork details:', error);
            } finally {
                setLoading(false);
            }
            return () => {
                controller.abort();
            }
        };

        void fetchArtworkDetails();
        
    }, [cart]);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching cart items</p>}
            <ul>
                {artworks && artworks.map(item => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Link to={'/order'}><button type="submit">Place order</button></Link>
        </div>
    );
};

export default ShoppingCart;