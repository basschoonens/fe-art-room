import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const password = watch('password');
    const [selectedRole, setSelectedRole] = React.useState('');

    const handleRegister = async (data) => {
        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
            authority: selectedRole === 'user' ? 'ROLE_USER' : 'ROLE_ARTIST'
        };

        const url = selectedRole === 'user' ? 'http://localhost:8080/users/user' : 'http://localhost:8080/users/artist';

        try {
            const response = await axios.post(url, userData);
            if (response.status === 201) {
                console.log(`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} created successfully`);
            }
        } catch (error) {
            console.error(error);
        }
        console.log(data);
    };

    const handleRoleChange = (event) => {
        const { value } = event.target;
        setSelectedRole(value);
        setValue('role', value);
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div>
                <label>I am an</label>
                <input
                    type="radio"
                    value="user"
                    {...register("role", { required: "Role is required" })}
                    checked={selectedRole === 'user'}
                    onChange={handleRoleChange}
                />
                <label>ArtLover</label>
                <input
                    type="radio"
                    value="artist"
                    {...register("role", { required: "Role is required" })}
                    checked={selectedRole === 'artist'}
                    onChange={handleRoleChange}
                />
                <label>Artist</label>
                {errors.role && <p>{errors.role.message}</p>}
            </div>
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
                        // required: "Password is required",
                        // minLength: {
                        //     value: 8,
                        //     message: "Password must be at least 8 characters long"
                        // },
                        // pattern: {
                        //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        //     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        // }
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