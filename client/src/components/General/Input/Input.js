import React from 'react';
import InputCSS from './Input.module.css';

const Input = ({placeholder, handleChange, name, value, isInputValid, isPassword}) => {
    return (
        <label className={InputCSS.customField}>
            <input 
                className={`${InputCSS.input} ${isInputValid === false && value.length > 0 && InputCSS.inputInvalid}`}
                id='inputField' 
                type={isPassword ? 'password' : 'text'} 
                onChange={handleChange} 
                name={name} 
                value={value}
                autoComplete='off' 
                required
                />
            <span className={InputCSS.placeholder}>
                <p>
                    {placeholder}
                </p>
            </span>
        </label>
    )
}

export default Input;