import styles from './MyOrders.module.css';
import WelcomeContent from "../../../../components/welcomeContentBar/WelcomeContent.jsx";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { currencyFormat } from "../../../../helpers/currencyFormat.js";

export default function MyOrders() {

    const [orders,setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const jwt = localStorage.getItem('jwt');

        const controller = new AbortController();

        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        };

        const fetchOrdersList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/orders/user`, config, { signal: controller.signal });
                setOrders(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersList();

        return () => {
            controller.abort();
        }

    }, []);

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
            <div className={styles.reviewData}>
                <h2>My Orders</h2>
                {loading && <p>Loading orders...</p>}
                {error && <p>Error loading orders: {error.message}</p>}
                <div className={styles.ordersContainer}>
                    {orders && orders.length === 0 && (
                        <p>No order found for you yet.</p>
                    )}
                    {orders && orders.map(order => (
                        <div key={order.orderId} className={styles.myOrder}>
                            <div className={styles.customerDetails}>
                                <p><strong>Name: {order.name}</strong></p>
                                <p>Address: {order.address}</p>
                                <p>Postal Code: {order.postalCode}</p>
                                <p>City: {order.city}</p>
                            </div>
                            <div className={styles.orderDetails}>
                                <p><strong>Order Number: {order.orderNumber}</strong></p>
                                <p>Order Date: {order.orderDate}</p>
                                <p>Order Status: {order.orderStatus}</p>
                                <p>Order Total: {currencyFormat(order.totalPrice)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}