import styles from './Order.module.css';
import React from 'react';
import {useCart} from '../../../context/CartContext.jsx';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import generateOrderNumber from '../../../helpers/orderNumber.js';
import Button from "../../../components/button/Button.jsx";
import {currencyFormat} from "../../../helpers/currencyFormat.js";
import {calculateTotalPrice} from "../../../helpers/calculateTotalPrice.js";

const OrderPage = () => {
    const {artworks, placeOrder, clearCart} = useCart();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const totalPrice = calculateTotalPrice(artworks);

    const onSubmit = async (data) => {
        const orderData = {
            orderNumber: generateOrderNumber(),
            orderDate: new Date().toISOString().split('T')[0],
            orderStatus: 'Pending',
            paymentMethod: data.paymentMethod,
            totalPrice: calculateTotalPrice(artworks),
            name: data.name,
            address: data.address,
            postalCode: data.postalCode,
            city: data.city,
            artworkId: artworks.map(item => item.artworkId),
        };

        console.log('Order data:', orderData)

        try {
            await placeOrder(orderData);
            clearCart();
            navigate('/confirmation', {state: {orderData}});
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h2>Order Page</h2>
            <h3>Please fill out your details to confirm your order.</h3>
            <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your name...'}
                        {...register('name', {required: true})} />
                    {errors.name && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your address...'}
                        {...register('address', {required: true})} />
                    {errors.address && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your postal code...'}
                        {...register('postalCode', {required: true})} />
                    {errors.postalCode && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your city...'}
                        {...register('city', {required: true})} />
                    {errors.city && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    {/*TODO make select payment method unselectable*/}
                    <select
                        defaultValue=""
                        {...register('paymentMethod', {required: true})}>
                        <option value="" disabled>Select payment method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="IDeal">IDeal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <h3>Artworks</h3>
                {/*TODO add date and order number etc.*/}
                <ul className={styles.itemsList}>
                    {artworks.map((artwork) => (
                        <li key={artwork.artworkId}>
                            <span>{artwork.title}</span>
                            <span>${currencyFormat(artwork.sellingPrice)}</span>
                        </li>
                    ))}
                </ul>
                <p className={styles.totalPrice}>Total price: {currencyFormat(totalPrice)}</p>
                <div className={styles.buttonsContainer}>
                    <Button type="button" text="Cancel" onClick={() => navigate('/maingallery')}/>
                    <Button type="submit" text="Place Order"/>
                </div>
            </form>
        </div>
    );
};

export default OrderPage;