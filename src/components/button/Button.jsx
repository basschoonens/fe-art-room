import './Button.module.css';
import React from 'react';


export default function Button({id, type, onClick, text}) {
    return (
        <button id={id} type={type} onClick={onClick}>{text}</button>
    )
}