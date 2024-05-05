// create a generic button component that can be reused everywhere in the app.

import React from 'react';
import './Button.css';

export default function Button({text, onClick, type}) {
    return (
        <button className="button" type={type} onClick={onClick}>{text}</button>
    )
}