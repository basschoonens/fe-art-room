import React from 'react';
import { useCart } from '../../../context/CartContext.jsx'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import generateOrderNumber from '../../../helpers/orderNumber.js';

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
                    <label>Postal Code:</label>
                    <input {...register('postalCode', { required: true })} />
                    {errors.postalCode && <span>This field is required</span>}
                </div>
                <div>
                    <label>City:</label>
                    <input {...register('city', { required: true })} />
                    {errors.city && <span>This field is required</span>}
                </div>
                <div>
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
                <ul>
                    {artworks.map((item) => (
                        <li key={item.id}>
                            {item.title} - ${item.sellingPrice}
                        </li>
                    ))}
                </ul>
                <p>Total price: ${totalPrice.toFixed(2)}</p>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderPage;