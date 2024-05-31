import styles from './Order.module.css';
import React from 'react';
import { useCart } from '../../../context/CartContext.jsx'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import generateOrderNumber from '../../../helpers/orderNumber.js';
import Button from "../../../components/button/Button.jsx";

const OrderPage = () => {
    const { artworks, placeOrder, clearCart } = useCart();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

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
            artworkIds: artworks.map(item => item.id),
        };

        console.log('Order data:', orderData)

        try {
            await placeOrder(orderData);
            clearCart();
            navigate('/confirmation');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const calculateTotalPrice = (artworks) => {
        return artworks.reduce((total, item) => total + item.sellingPrice, 0);
    }

    const totalPrice = calculateTotalPrice(artworks);

    return (
        <div className={styles.pageContainer}>
            <h2>Order Page</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input {...register('name', { required: true })} />
                    {errors.name && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Address:</label>
                    <input {...register('address', { required: true })} />
                    {errors.address && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Postal Code:</label>
                    <input {...register('postalCode', { required: true })} />
                    {errors.postalCode && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>City:</label>
                    <input {...register('city', { required: true })} />
                    {errors.city && <span className={styles.error}>This field is required</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Payment Method:</label>
                    <select {...register('paymentMethod', { required: true })}>
                        <option value="">Select payment method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <h3>Items</h3>
                <ul className={styles.itemsList}>
                    {artworks.map((item) => (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <span>${item.sellingPrice.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <p className={styles.totalPrice}>Total price: ${totalPrice.toFixed(2)}</p>
                <Button type="submit" text="Confirm" />
            </form>
        </div>
    );
};

export default OrderPage;