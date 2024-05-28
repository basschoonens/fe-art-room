import React, {useEffect, useState} from 'react';
import { useCart } from '../../../context/CartContext.jsx';
import axios from "axios";

const ShoppingCart = () => {
    const { cart, removeFromCart } = useCart();
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworkDetails = async () => {
            try {
                const artworkDetails = await Promise.all(
                    cart.map(async (item) => {
                        const response = await axios.get(`http://localhost:8080/artworks/${item.id}`);
                        return response.data;
                    })
                );
                setArtworks(artworkDetails);
            } catch (error) {
                console.error('Error fetching artwork details:', error);
            }
        };

        fetchArtworkDetails();
    }, [cart]);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <ul>
                {artworks && artworks.map(item => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button type="submit">Place order</button>
        </div>
    );
};

export default ShoppingCart;