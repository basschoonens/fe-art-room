import styles from './Order.module.css';
import React from 'react';
import {useCart} from '../../../context/CartContext.jsx';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import generateOrderNumber from '../../../helpers/orderNumber.js';
import Button from "../../../components/button/Button.jsx";
import {currencyFormat} from "../../../helpers/currencyFormat.js";
import {calculateTotalPrice} from "../../../helpers/calculateTotalPrice.js";
import axios from "axios";

const OrderPage = () => {
    const { artworks, clearCart } = useCart();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const jwt = localStorage.getItem('jwt');
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

        const abortController = new AbortController();

        try {
            const response = await axios.post('http://localhost:8080/orders/user', orderData, {
                signal: abortController.signal,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            if (response.status !== 201) {
                alert('Order placement failed, please contact the gallery.')
            }
            console.log('Order placed:', response.data);
            clearCart();
            if (response.status === 201){
            navigate('/confirmation', { state: { orderData } });
            }
        } catch (error) {
            alert('Order placement failed, please contact the gallery.');
        } finally {
            abortController.abort();
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
                        {...register('name', {
                            required: 'Please enter your full name',
                            maxLength: {value: 100, message: 'Name must not exceed 100 characters'}
                        })}
                    />
                    {errors.name && <span className={styles.errorMessage}>Please enter your full name</span>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your address...'}
                        {...register('address', {
                            required: 'Please enter your address',
                            maxLength: {value: 150, message: 'Address must not exceed 150 characters'}
                        })} />
                    {errors.address && <span className={styles.errorMessage}>Please enter your address</span>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Enter your postal code"
                        {...register('postalCode', {
                            required: 'Please enter your postal code (####CC)',
                            pattern: {
                                value: /^\d{4}\s?[A-Za-z]{2}$/,
                                message: 'Postal code must be in the format ####CC or #### CC'
                            }
                        })}
                    />
                </div>
                {errors.postalCode && <span className={styles.errorMessage}>{errors.postalCode.message}</span>}
                <div className={styles.formGroup}>
                    <input
                        placeholder={'Enter your city...'}
                        {...register('city', {
                            required: 'Plesae enter your city',
                            maxLength: {value: 100, message: 'Address must not exceed 100 characters'}
                        })} />
                    {errors.city && <span className={styles.errorMessage}>Please enter your city</span>}
                </div>
                <div className={styles.formGroup}>
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