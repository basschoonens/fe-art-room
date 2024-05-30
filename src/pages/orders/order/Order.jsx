import React from 'react';
import { useCart } from '../../../context/CartContext.jsx'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import generateOrderNumber from '../../../helpers/orderNumber.js';

const OrderPage = () => {
    const { cart, placeOrder, clearCart } = useCart();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log('cart:', cart);

    const onSubmit = async (data) => {
        const orderData = {
            ...data,
            orderNumber: generateOrderNumber(),
            orderDate: new Date().toISOString().split('T')[0],
            orderStatus: 'Pending',
            totalPrice: calculateTotalPrice(cart),
            artworkIds: cart.map(item => item.id),
        };

        try {
            await placeOrder(orderData);
            clearCart();
            navigate('/confirmation');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <h2>Order Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input {...register('name', { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div>
                    <label>Address:</label>
                    <input {...register('address', { required: true })} />
                    {errors.address && <span>This field is required</span>}
                </div>
                <div>
                    <label>Payment Method:</label>
                    <input {...register('paymentMethod', { required: true })} />
                    {errors.paymentMethod && <span>This field is required</span>}
                </div>
                <div>
                    <label>Shipping Address:</label>
                    <input {...register('shippingAddress', { required: true })} />
                    {errors.shippingAddress && <span>This field is required</span>}
                </div>
                <div>
                    <label>Billing Address:</label>
                    <input {...register('billingAddress', { required: true })} />
                    {errors.billingAddress && <span>This field is required</span>}
                </div>
                <h3>Items</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.title} - ${item.price}
                        </li>
                    ))}
                </ul>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderPage;
