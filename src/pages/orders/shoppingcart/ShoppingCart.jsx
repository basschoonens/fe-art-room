import React, {useEffect, useState} from 'react';
import { useCart } from '../../../context/CartContext.jsx';
import axios from "axios";
import {Link} from "react-router-dom";

const ShoppingCart = () => {
    const {artworks, removeFromCart, loading, error } = useCart();

    console.log('artworks:', artworks);

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