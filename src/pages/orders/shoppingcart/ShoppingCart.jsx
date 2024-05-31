import styles from './ShoppingCart.module.css';
import React, {useEffect, useState} from 'react';
import {useCart} from '../../../context/CartContext.jsx';
import {Link} from "react-router-dom";
import {currencyFormat} from "../../../helpers/currencyFormat.js";
import Button from "../../../components/button/Button.jsx";


const ShoppingCart = () => {
    const {artworks,removeFromCart, loading, error} = useCart();

    console.log('artworks:', artworks);

    return (
        <div className={styles.pageContainer}>
            <h2>Shopping Cart</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching cart items</p>}
            {artworks.length > 0 ? (
                <table className={styles.cartTable}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {artworks.map(artwork => (
                        <tr key={artwork.id}>
                            <td>{artwork.title}</td>
                            <td>{currencyFormat(artwork.sellingPrice)}</td>
                            <td>
                                <Button type="button" variant="small" text="Remove"
                                        onClick={() => removeFromCart(artwork.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Your cart is empty</p>
            )}
            <p>Your total: {currencyFormat(artworks.reduce((acc, artwork) => acc + artwork.sellingPrice, 0))}</p>
            <div className={styles.buttonsContainer}>
            <Link to={'/maingallery'}><Button type="button" text="Cancel" /></Link>
            <Link to={'/order'}><Button type="submit" text="Place Order" /></Link>
            </div>
        </div>
    );
};

export default ShoppingCart;