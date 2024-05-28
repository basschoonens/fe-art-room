import React, {createContext, useState, useContext, useEffect} from 'react';

const CART_STORAGE_KEY = 'cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart items from local storage when component mounts
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart items to local storage whenever cart changes
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        console.log('Adding item to cart:', item)
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const placeOrder = async () => {
        try {
            const response = await fetch('http://your-backend-url/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
            if (!response.ok) throw new Error('Order placement failed');
            clearCart(); // Clear the cart after successful order placement
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    // const [cartUpdateCounter, setCartUpdateCounter] = useState(0);
    //
    // const updateCart = () => {
    //     setCartUpdateCounter(prevCounter => prevCounter + 1);
    // };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};