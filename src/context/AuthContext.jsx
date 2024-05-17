import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    isAuth: false,
    user: null,
    role: '',
    login: () => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: '',
    });
    const navigate = useNavigate();

    function login() {
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                username: "",
                email: "",
                id: "",
                role: ""
            },
        });
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
        role: auth.role,
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
