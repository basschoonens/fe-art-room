import styles from './ShoppingCart.module.css';
import React from 'react';
import {useCart} from '../../../context/CartContext.jsx';
import {useNavigate} from "react-router-dom";
import {currencyFormat} from "../../../helpers/currencyFormat.js";
import Button from "../../../components/button/Button.jsx";
import {calculateTotalPrice} from "../../../helpers/calculateTotalPrice.js";

const ShoppingCart = () => {
    const {artworks,removeFromCart, loading, error} = useCart();
    const totalPrice = calculateTotalPrice(artworks);
    const navigate = useNavigate();

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
                        <tr key={artwork.artworkId}>
                            <td>{artwork.title}</td>
                            <td>{currencyFormat(artwork.sellingPrice)}</td>
                            <td>
                                <Button type="button" variant="small" text="Remove"
                                        onClick={() => removeFromCart(artwork.artworkId)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Your cart is empty</p>
            )}
            <p>Your total: {currencyFormat(totalPrice)}</p>
            <div className={styles.buttonsContainer}>
            <Button type="button" text="Cancel" onClick={() => navigate('/maingallery')} />
            <Button type="submit" text="Place Order" onClick={() => navigate('/order')} disabled={artworks.length === 0} />
            </div>
        </div>
    );
};

export default ShoppingCart;