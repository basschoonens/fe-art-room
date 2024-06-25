import styles from './Login.module.css';
import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import WelcomeContent from "../../components/welcomeContentBar/WelcomeContent.jsx";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            });
            if (response.status === 200) {
                login(response.data.jwt);
                navigate('/profile');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Incorrect password');
            } else {
                setError('Login failed. Please check your username, or try again later.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible);
    };

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
            <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
                <h2 className={styles.loginHeading}>Please login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.usernameContainer}>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    className={styles.inputField}
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters long"
                        }
                    })} />
                </div>
                {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                <div className={styles.passwordContainer}>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        className={styles.inputField}
                        {...register("password", {required: "Password is required"})} />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.visibilityToggle}
                        aria-label="Toggle password visibility"
                    >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
            <p>Please register <Link to="/register">here</Link> if you don't have an account yet.</p>
        </div>
    );
}