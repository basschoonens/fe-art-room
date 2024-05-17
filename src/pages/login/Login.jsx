// src/Login.js
import React from 'react';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => {
        console.log(data);
        // Here you would usually send a request to your server to log the user in
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Entered value does not match email format"
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