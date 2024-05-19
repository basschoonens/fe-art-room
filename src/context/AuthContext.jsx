import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity.js";

export const AuthContext = createContext({
    isAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: '',
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            void logout();
        }
    }, []);

    const login = async (jwt) => {
        const decodedToken = (jwtDecode(jwt));
        localStorage.setItem(('jwt'), jwt)
        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log(response.data);
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    authority: response.data.authority,
                },
                status: 'done',
            });
        } catch (error) {
                console.error(error);
        }
        console.log('Gebruiker is ingelogd!');
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: '',
            status: 'done',
        });
        localStorage.removeItem('jwt');
        navigate('/login')
        console.log('Gebruiker is uitgelogd!');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
