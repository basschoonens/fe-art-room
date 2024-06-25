import styles from "./AllOrders.module.css";
import WelcomeContent from "../../../../components/welcomeContentBar/WelcomeContent.jsx";
import Button from "../../../../components/button/Button.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { currencyFormat } from "../../../../helpers/currencyFormat.js";

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const controller = new AbortController();

        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        };

        const fetchOrdersList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8080/orders/admin`,
                    config,
                    { signal: controller.signal }
                );
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
        };
    }, []);

    const handleDelete = async (orderId) => {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(
                `http://localhost:8080/orders/admin/${orderId}`,
                config
            );
            setOrders(orders.filter((order) => order.orderId !== orderId));
        } catch (error) {
            setError(error)
        }
    };

    const handleApprove = async (orderId) => {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.put(
                `http://localhost:8080/orders/admin/${orderId}`,
                null,
                config
            );
            const updatedOrders = orders.map((order) =>
                order.orderId === orderId
                    ? { ...order, orderStatus: "APPROVED" }
                    : order
            );
            setOrders(updatedOrders);
        } catch (error) {
            setError(error)
        }
    };


    const pendingOrders = orders.filter(
        (order) => order.orderStatus !== "APPROVED"
    );
    const approvedOrders = orders.filter(
        (order) => order.orderStatus === "APPROVED"
    );

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
            <div className={styles.reviewData}>
                <h2>My Orders</h2>
                {loading && <p>Loading orders...</p>}
                {error && <p>Error: {error.message}</p>}
                <div className={styles.ordersContainer}>
                    {pendingOrders.length === 0 && approvedOrders.length === 0 && (
                        <p>No orders found.</p>
                    )}
                    {pendingOrders.length > 0 && (
                        <>
                        <h3>Pending Orders</h3>
                        <div className={styles.pendingOrders}>
                            {pendingOrders.map((order) => (
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
                                        <p>Order Total: {currencyFormat(order.totalPrice)}</p>
                                    </div>
                                    <div className={styles.buttonWrapper}>
                                    <Button
                                        className={styles.approveButton}
                                        type="button"
                                        text="Approve Order"
                                        variant="small"
                                        onClick={() => handleApprove(order.orderId)}
                                    />
                                    <Button
                                        className={styles.deleteButton}
                                        type="button"
                                        text="Cancel Order"
                                        variant="small"
                                        onClick={() => handleDelete(order.orderId)}
                                    />
                                    </div>
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                    {approvedOrders.length > 0 && (
                        <>
                        <h3>Approved Orders</h3>
                        <div className={styles.approvedOrders}>
                            {approvedOrders.map((order) => (
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
                                        <p>Order Total: {currencyFormat(order.totalPrice)}</p>
                                    </div>
                                    <Button
                                        className={styles.deleteButton}
                                        type="button"
                                        text="Cancel Order"
                                        variant="small"
                                        onClick={() => handleDelete(order.orderId)}
                                    />
                                </div>
                            ))}

                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
