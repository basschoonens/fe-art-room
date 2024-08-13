import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './Confirmation.module.css';
import Button from "../../../components/button/Button.jsx";
import {currencyFormat} from "../../../helpers/currencyFormat.js";

const Confirmation = () => {
    const location = useLocation();
    const { orderData } = location.state || {};
    const navigate = useNavigate();

    if (!orderData) {
        return <div>No order data found. Please try again.</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <h2>Order Confirmation</h2>
            <p>Thank you for your order! Here are your order details:</p>
            <p>Our gallery curator will contact you soon in order to finalize details and delivery</p>
            <div className={styles.orderDetails}>
                <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
                <p><strong>Order Date:</strong> {orderData.orderDate}</p>
                <p><strong>Order Status:</strong> {orderData.orderStatus}</p>
                <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
                <p><strong>Total Price:</strong> {currencyFormat(orderData.totalPrice)}</p>
                <div className={styles.buttonsContainer}>
                    <Button type="button" text="Back to Gallery" onClick={() => navigate('/maingallery')}/>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;