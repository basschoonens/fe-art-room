import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const CART_STORAGE_KEY = 'cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // import the jwt token from local storage
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
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

    useEffect(() => {

        const controller = new AbortController();
        const fetchArtworkDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const artworkDetails = await Promise.all(
                    // TODO check if this is necessary
                    cart.map(async (item) => {
                        const response = await axios.get(`http://localhost:8080/artworks/${item.id}`, { signal: controller.signal });
                        return response.data;
                    })
                );
                setArtworks(artworkDetails);
            } catch (error) {
                setError(error);
                console.error('Error fetching artwork details:', error);
            } finally {
                setLoading(false);
            }
            return () => {
                controller.abort();
            }
        };

        void fetchArtworkDetails();

    }, [cart]);

    const placeOrder = async (orderData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });

            if (response.status !== 200) throw new Error('Order placement failed');

            console.log('Order placed:', response.data);
            // clearCart(); // Uncomment if you want to clear the cart after successful order placement
        } catch (error) {
            console.error('Error placing order:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ artworks, cart, addToCart, removeFromCart, clearCart, placeOrder}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};