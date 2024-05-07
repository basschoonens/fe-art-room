import React from 'react';
import styles from './Button.module.css';

export default function Button({ id, type, onClick, text, className }) {
    // Concatenate the original button class name with the provided className
    const buttonClassName = `${styles}.${className}`;

    return (
        <button className={buttonClassName} id={id} type={type} onClick={onClick}>
            {text}
        </button>
    );
}