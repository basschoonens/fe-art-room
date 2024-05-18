import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);

    const handleLogin = async(data) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            });
            console.log(response)
            if (response.status === 200) {
            login(response.data.jwt);
            }
            console.log("User logged in successfully");
            } catch (error) {
               console.error(error);
        }

        console.log(data);
        // Here you would usually send a request to your server to log the user in\

    };

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <label>Username</label>
                    <input {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters long"
                        }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" {...register("password", {required: "Password is required"})} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Please register <Link to="/register">here</Link> if you don't have an account yet.</p>
        </>
    );
};

export default Login;