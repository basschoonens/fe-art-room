import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password'); // Watch the password field for validation

    const onSubmit = data => {
        console.log(data);
        // Here you would usually send a request to your server to register the user
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <input {...register("username", { required: "Username is required" })} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

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
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                    })}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;