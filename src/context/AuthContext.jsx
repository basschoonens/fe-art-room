import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
    });
    const navigate = useNavigate();

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
                    // id: response.data.id,
                    authority: response.data.authority,
                },
            });
        } catch (error) {
                console.error(error);
        }


        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: '',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
