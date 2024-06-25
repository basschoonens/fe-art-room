import React from 'react';
import styles from './Button.module.css';
import smallStyles from './ButtonSmall.module.css';

export default function Button({ id, type, onClick, text, className, variant = 'default', disabled }) {
    const getButtonStyles = () => {
        switch (variant) {
            case 'small':
                return smallStyles.button;
            case 'default':
            default:
                return styles.button;
        }
    };

    const buttonClassName = `${getButtonStyles()} ${className || ''}`;

    return (
        <button className={buttonClassName} id={id} type={type} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}