import styles from './Register.module.css';
import React from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import WelcomeContent from "../../components/welcomeContentBar/WelcomeContent.jsx";

export default function Register(){
    const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm();
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

            alert('Your registration is successful, please login to continue');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Username already exists, please try again with a different username');
            } else {
                console.error(error);
                alert('We\'re sorry, something went wrong. Please try again or contact our gallery for assistance.');
            }
        }
        console.log(data);
    };

    const handleRoleChange = (event) => {
        const {value} = event.target;
        setSelectedRole(value);
        setValue('role', value);
    };

    return (
        <div className={styles.pageContainer}>
        <WelcomeContent/>
        <form className={styles.registerForm} onSubmit={handleSubmit(handleRegister)}>
            <div>
                <h2 className={styles.registerHeading}>Please register</h2>
                <div className={styles.roleContainer}>
                    <label>I am an</label>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type="radio"
                            value="user"
                            id="user"
                            className={styles.checkboxInput}
                            {...register("role", {required: "Are you an Artlover or an Artist ?"})}
                            checked={selectedRole === 'user'}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="user" className={styles.customCheckbox}></label>
                        <label htmlFor="user" className={styles.checkboxLabel}>ArtLover</label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type="radio"
                            value="artist"
                            id="artist"
                            className={styles.checkboxInput}
                            {...register("role", {required: "Are you an Artlover or an Artist ?"})}
                            checked={selectedRole === 'artist'}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="artist" className={styles.customCheckbox}></label>
                        <label htmlFor="artist" className={styles.checkboxLabel}>Artist</label>
                    </div>
                </div>
            </div>
            {errors.role && <p className={styles.errorMessage}>{errors.role.message}</p>}
            <input className={styles.inputField}
                   placeholder="Username"
                   {...register("username", {required: "Username is required"})} />
            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
            <input className={styles.inputField}
                   placeholder="Email"
                   {...register("email", {
                       required: "Email is required",
                       pattern: {
                           value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                           message: "Entered value does not match email format"
                       }
                   })} />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            <input
                className={styles.inputField}
                placeholder="Password"
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
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
            <input
                className={styles.inputField}
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                })}
            />
            {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>}
            <button id={styles.registerButton} type="submit">Register</button>
        </form>
        </div>
    );
};