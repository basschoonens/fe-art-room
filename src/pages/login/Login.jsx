import styles from './Login.module.css';
import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import WelcomeContent from "../../components/welcomeContentBar/WelcomeContent.jsx";

export default function Login(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            });
            console.log(response)
            if (response.status === 200) {
                login(response.data.jwt);
                navigate('/profile');
            }
            console.log("User logged in successfully");
        } catch (error) {
            console.error(error);
        }
        console.log(data);
        // Here you would usually send a request to your server to log the user in\

    };

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent/>
            <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
                <h2 className={styles.loginHeading}>Please login</h2>
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
                    {errors.email && <p>{errors.email.message}</p>}
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        className={styles.inputField}
                        {...register("password", {required: "Password is required"})} />
                    {errors.password && <p>{errors.password.message}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Please register <Link to="/register">here</Link> if you don't have an account yet.</p>
        </div>
    );
};