import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const CART_STORAGE_KEY = 'cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        if (item && item.artworkId) {
        setCart([...cart, item]);
        } else {
            alert(`Invalid item: ${item}`);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.artworkId !== itemId));
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
                    cart.map(async (item) => {
                        const response = await axios.get(`http://localhost:8080/artworks/${item.artworkId}`, { signal: controller.signal });
                        return response.data;
                    })
                );
                setArtworks(artworkDetails);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
            return () => {
                controller.abort();
            }
        };

        void fetchArtworkDetails();

    }, [cart]);

    return (
        <CartContext.Provider value={{ artworks, cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};