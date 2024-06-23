import styles from './MyOrders.module.css';
import WelcomeContent from "../../../components/welcomeContentBar/WelcomeContent.jsx";
import Button from "../../../components/button/Button.jsx";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext.jsx";

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
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error); // Log the error
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

    // const handleDelete = async (orderId) => {
    //     const jwt = localStorage.getItem('jwt');
    //     const config = {
    //         headers: {
    //             'Authorization': `Bearer ${jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //
    //     try {
    //         await axios.delete(`http://localhost:8080/orders/${orderId}`, config);
    //         setOrders(orders.filter(order => order.orderId !== orderId));
    //     } catch (error) {
    //         console.error('Error deleting order:', error);
    //     }
    // };

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
                        <div key={order.orderId} className={styles.order}>
                            <div className={styles.customerDetails}>
                                <p>Name: {order.name}</p>
                                <p>Address: {order.address}</p>
                                <p>Postal Code: {order.postalCode}</p>
                                <p>City: {order.city}</p>
                            </div>
                            <div className={styles.orderDetails}>
                                <p>Order Number: {order.orderNumber}</p>
                                <p>Order Date: {order.orderDate}</p>
                                <p>Order Status: {order.orderStatus}</p>
                                <p>Order Total: {order.totalPrice}</p>
                            </div>
                            {/*<Button*/}
                            {/*    className={styles.deleteButton}*/}
                            {/*    type="button"*/}
                            {/*    text="Cancel Order"*/}
                            {/*    onClick={() => handleDelete(order.orderId)}*/}
                            {/*/>*/}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}